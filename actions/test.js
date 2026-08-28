'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import db from '@/lib/db'
import { getTeacherSession } from '@/lib/session'

function generateTestCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'TEST-'
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

async function uniqueTestCode() {
  let code, exists
  do {
    code = generateTestCode()
    exists = await db.test.findUnique({ where: { testCode: code } })
  } while (exists)
  return code
}

export async function createTest(formData) {
  const session = await getTeacherSession()
  const teacherId = session.teacher.id

  const title = formData.get('title')?.toString().trim()
  const description = formData.get('description')?.toString().trim() || null
  const timeLimitRaw = formData.get('timeLimit')?.toString().trim()
  const startAtRaw = formData.get('startAt')?.toString().trim()
  const endAtRaw = formData.get('endAt')?.toString().trim()
  const displayMode = formData.get('displayMode')?.toString() || 'ALL'
  const maxAttemptsRaw = formData.get('maxAttempts')?.toString().trim()

  if (!title || title.length < 3) {
    return { errors: { title: 'Test title must be at least 3 characters.' } }
  }

  const timeLimit = timeLimitRaw ? parseInt(timeLimitRaw) : null
  const startAt = startAtRaw ? new Date(startAtRaw) : null
  const endAt = endAtRaw ? new Date(endAtRaw) : null
  const maxAttempts = maxAttemptsRaw ? parseInt(maxAttemptsRaw) : 1
  const testCode = await uniqueTestCode()

  const test = await db.test.create({
    data: {
      title,
      description,
      timeLimit,
      startAt,
      endAt,
      displayMode,
      maxAttempts,
      testCode,
      teacherId,
    },
  })

  redirect(`/teacher/test/${test.id}/questions`)
}

export async function updateTest(testId, formData) {
  const session = await getTeacherSession()

  const test = await db.test.findFirst({
    where: { id: testId, teacherId: session.teacher.id },
  })
  if (!test) return { errors: { general: 'Test not found.' } }

  const title = formData.get('title')?.toString().trim()
  const description = formData.get('description')?.toString().trim() || null
  const timeLimitRaw = formData.get('timeLimit')?.toString().trim()
  const startAtRaw = formData.get('startAt')?.toString().trim()
  const endAtRaw = formData.get('endAt')?.toString().trim()
  const displayMode = formData.get('displayMode')?.toString() || 'ALL'
  const maxAttemptsRaw = formData.get('maxAttempts')?.toString().trim()
  const showAnswers = formData.get('showAnswers') === 'true'
  const showPerQuestion = formData.get('showPerQuestion') === 'true'

  if (!title || title.length < 3) {
    return { errors: { title: 'Test title must be at least 3 characters.' } }
  }

  await db.test.update({
    where: { id: testId },
    data: {
      title,
      description,
      timeLimit: timeLimitRaw ? parseInt(timeLimitRaw) : null,
      startAt: startAtRaw ? new Date(startAtRaw) : null,
      endAt: endAtRaw ? new Date(endAtRaw) : null,
      displayMode,
      maxAttempts: maxAttemptsRaw ? parseInt(maxAttemptsRaw) : 1,
      showAnswers,
      showPerQuestion,
    },
  })

  revalidatePath(`/teacher/test/${testId}`)
  redirect(`/teacher/test/${testId}`)
}

export async function toggleTestActive(testId) {
  const session = await getTeacherSession()

  const test = await db.test.findFirst({
    where: { id: testId, teacherId: session.teacher.id },
  })
  if (!test) return { errors: { general: 'Test not found.' } }

  await db.test.update({
    where: { id: testId },
    data: { isActive: !test.isActive },
  })

  revalidatePath(`/teacher/test/${testId}`)
  revalidatePath('/teacher/dashboard')
}

export async function deleteTest(testId) {
  const session = await getTeacherSession()

  const test = await db.test.findFirst({
    where: { id: testId, teacherId: session.teacher.id },
  })
  if (!test) return { errors: { general: 'Test not found.' } }

  await db.test.delete({ where: { id: testId } })

  revalidatePath('/teacher/dashboard')
  redirect('/teacher/dashboard')
}
