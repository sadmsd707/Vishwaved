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

  redirect(`/student/submitted?code=${testCode}`)
}

export async function startTest(formData) {
  const testCode = formData.get('testCode')?.toString().trim().toUpperCase()
  const studentName = formData.get('studentName')?.toString().trim()
  const studentRoll = formData.get('studentRoll')?.toString().trim()

  if (!testCode) return { errors: { testCode: 'Test ID is required.' } }
  if (!studentName) return { errors: { studentName: 'Name is required.' } }
  if (!studentRoll) return { errors: { studentRoll: 'Roll number is required.' } }

  const test = await db.test.findUnique({ where: { testCode } })

  if (!test) return { errors: { testCode: 'Invalid Test ID. Please check and try again.' } }
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
