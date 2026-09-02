'use server'

import { redirect } from 'next/navigation'
import db from '@/lib/db'
import { gradeSubmission } from '@/lib/grading'

export async function submitTest(testCode, formData) {
  // Load test with questions (correct answers stay server-side)
  const test = await db.test.findUnique({
    where: { testCode },
    include: {
      questions: { orderBy: { order: 'asc' } },
    },
  })

  if (!test || !test.isActive) {
    return { errors: { general: 'This test is no longer available.' } }
  }

  const now = new Date()
  if (test.startAt && now < test.startAt) {
    return { errors: { general: 'This test has not started yet.' } }
  }
  if (test.endAt && now > test.endAt) {
    return { errors: { general: 'This test has ended.' } }
  }

  const studentName = formData.get('studentName')?.toString().trim()
  const studentRoll = formData.get('studentRoll')?.toString().trim()

  if (!studentName || studentName.length < 1) {
    return { errors: { studentName: 'Name is required.' } }
  }
  if (!studentRoll || studentRoll.length < 1) {
    return { errors: { studentRoll: 'Roll number is required.' } }
  }

  // Check max attempts
  const existingCount = await db.submission.count({
    where: {
      testId: test.id,
      studentRoll: studentRoll.toLowerCase(),
    },
  })
  if (existingCount >= test.maxAttempts) {
    return { errors: { general: `You have already submitted this test (max ${test.maxAttempts} attempt(s) allowed).` } }
  }

  // Build answers map from form data
  const answersMap = {}
  for (const question of test.questions) {
    const answer = formData.get(`q_${question.id}`)?.toString().trim() ?? ''
    answersMap[question.id] = answer
  }

  // Grade entirely on server — correct answers never sent to client
  const { gradedAnswers, totalScore, maxScore } = gradeSubmission(test.questions, answersMap)

  // Store submission and answers in a transaction
  const submission = await db.$transaction(async (tx) => {
    const sub = await tx.submission.create({
      data: {
        testId: test.id,
        studentName,
        studentRoll: studentRoll.toLowerCase(),
        totalScore,
        maxScore,
      },
    })
    await tx.answer.createMany({
      data: gradedAnswers.map((a) => ({ ...a, submissionId: sub.id })),
    })
    return sub
  })

  return { success: true, redirectTo: `/student/submitted?code=${testCode}` }
}

export async function startTest(formData) {
  const studentId = formData.get('studentId')?.toString().trim()
  const dob = formData.get('dob')?.toString().trim()
  const testCode = formData.get('testCode')?.toString().trim().toUpperCase()

  if (!studentId) return { errors: { studentId: 'Student ID is required.' } }
  if (!dob) return { errors: { dob: 'Date of birth is required.' } }
  if (!testCode) return { errors: { testCode: 'Test Code is required.' } }

  // Verify student exists
  const student = await db.student.findUnique({ where: { id: studentId } })
  if (!student) return { errors: { studentId: 'Invalid Student ID. Please check and try again.' } }

  // Verify DOB matches
  const studentDob = new Date(student.dob).toISOString().split('T')[0]
  const inputDob = new Date(dob).toISOString().split('T')[0]
  if (studentDob !== inputDob) return { errors: { dob: 'Date of birth does not match. Please check.' } }

  // Build full name from student record
  const studentName = `${student.firstName} ${student.middleName} ${student.surname}`
  const studentRoll = student.id

  const test = await db.test.findUnique({ where: { testCode } })

  if (!test) return { errors: { testCode: 'Invalid Test Code. Please check and try again.' } }
  if (!test.isActive) return { errors: { testCode: 'This test is currently disabled by the teacher.' } }

  const now = new Date()
  if (test.startAt && now < test.startAt) {
    return { errors: { testCode: `This test opens on ${test.startAt.toLocaleString()}.` } }
  }
  if (test.endAt && now > test.endAt) {
    return { errors: { testCode: 'This test has ended.' } }
  }

  const existingCount = await db.submission.count({
    where: { testId: test.id, studentRoll: studentRoll.toLowerCase() },
  })
  if (existingCount >= test.maxAttempts) {
    return { errors: { general: 'You have already submitted this test.' } }
  }

  redirect(`/student/test/${testCode}?name=${encodeURIComponent(studentName)}&roll=${encodeURIComponent(studentRoll)}`)
}
