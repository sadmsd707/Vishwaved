'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
import { getTeacherSession } from '@/lib/session'

async function verifyTestOwner(testId, teacherId) {
  const test = await db.test.findFirst({ where: { id: testId, teacherId } })
  if (!test) throw new Error('Unauthorized')
  return test
}

export async function addQuestion(testId, formData) {
  const session = await getTeacherSession()
  await verifyTestOwner(testId, session.teacher.id)

  const type = formData.get('type')?.toString()
  const text = formData.get('text')?.toString().trim()
  const marks = parseInt(formData.get('marks')?.toString() || '1')
  const explanation = formData.get('explanation')?.toString().trim() || null

  if (!text || text.length < 2) return { errors: { text: 'Question text is required.' } }
  if (!['MCQ', 'NUMERICAL'].includes(type)) return { errors: { type: 'Invalid question type.' } }

  let options = null
  let correctAnswer = ''
  let tolerance = null

  if (type === 'MCQ') {
    const optA = formData.get('optA')?.toString().trim()
    const optB = formData.get('optB')?.toString().trim()
    const optC = formData.get('optC')?.toString().trim()
    const optD = formData.get('optD')?.toString().trim()
    correctAnswer = formData.get('correctAnswer')?.toString() // '0','1','2','3'

    if (!optA || !optB || !optC || !optD) return { errors: { options: 'All 4 options are required.' } }
    if (!['0', '1', '2', '3'].includes(correctAnswer)) return { errors: { correctAnswer: 'Select the correct option.' } }

    options = [optA, optB, optC, optD]
  }

  if (type === 'NUMERICAL') {
    correctAnswer = formData.get('correctAnswer')?.toString().trim()
    const toleranceRaw = formData.get('tolerance')?.toString().trim()
    tolerance = toleranceRaw ? parseFloat(toleranceRaw) : 0

    if (!correctAnswer || isNaN(parseFloat(correctAnswer))) {
      return { errors: { correctAnswer: 'A valid numerical answer is required.' } }
    }
  }

  const count = await db.question.count({ where: { testId } })

  await db.question.create({
    data: { testId, type, text, options, correctAnswer, tolerance, marks, explanation, order: count },
  })

  revalidatePath(`/teacher/test/${testId}/questions`)
  return { success: true }
}

export async function updateQuestion(questionId, formData) {
  const session = await getTeacherSession()

  const question = await db.question.findFirst({
    where: { id: questionId },
    include: { test: true },
  })
  if (!question || question.test.teacherId !== session.teacher.id) {
    return { errors: { general: 'Unauthorized' } }
  }

  const type = question.type
  const text = formData.get('text')?.toString().trim()
  const marks = parseInt(formData.get('marks')?.toString() || '1')
  const explanation = formData.get('explanation')?.toString().trim() || null

  let options = null
  let correctAnswer = ''
  let tolerance = null

  if (type === 'MCQ') {
    const optA = formData.get('optA')?.toString().trim()
    const optB = formData.get('optB')?.toString().trim()
    const optC = formData.get('optC')?.toString().trim()
    const optD = formData.get('optD')?.toString().trim()
    correctAnswer = formData.get('correctAnswer')?.toString()
    options = [optA, optB, optC, optD]
  }

  if (type === 'NUMERICAL') {
    correctAnswer = formData.get('correctAnswer')?.toString().trim()
    const toleranceRaw = formData.get('tolerance')?.toString().trim()
    tolerance = toleranceRaw ? parseFloat(toleranceRaw) : 0
  }

  await db.question.update({
    where: { id: questionId },
    data: { text, options, correctAnswer, tolerance, marks, explanation },
  })

  revalidatePath(`/teacher/test/${question.testId}/questions`)
  return { success: true }
}

export async function deleteQuestion(questionId) {
  const session = await getTeacherSession()

  const question = await db.question.findFirst({
    where: { id: questionId },
    include: { test: true },
  })
  if (!question || question.test.teacherId !== session.teacher.id) {
    return { errors: { general: 'Unauthorized' } }
  }

  const testId = question.testId
  await db.question.delete({ where: { id: questionId } })

  // Re-order remaining questions
  const remaining = await db.question.findMany({
    where: { testId },
    orderBy: { order: 'asc' },
  })
  for (let i = 0; i < remaining.length; i++) {
    await db.question.update({ where: { id: remaining[i].id }, data: { order: i } })
  }

  revalidatePath(`/teacher/test/${testId}/questions`)
  return { success: true }
}

export async function reorderQuestions(testId, orderedIds) {
  const session = await getTeacherSession()
  await verifyTestOwner(testId, session.teacher.id)

  for (let i = 0; i < orderedIds.length; i++) {
    await db.question.update({ where: { id: orderedIds[i] }, data: { order: i } })
  }

  revalidatePath(`/teacher/test/${testId}/questions`)
}
