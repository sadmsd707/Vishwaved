'use server'

import { revalidatePath } from 'next/cache'
import db from '@/lib/db'
import { getTeacherSession } from '@/lib/session'

async function verifyTestOwner(testId, teacherId) {
  const test = await db.test.findFirst({ where: { id: testId, teacherId } })
  if (!test) throw new Error('Unauthorized')
  return test
}

export async function publishAll(testId) {
  const session = await getTeacherSession()
  await verifyTestOwner(testId, session.teacher.id)

  await db.submission.updateMany({
    where: { testId },
    data: { isPublished: true },
  })

  revalidatePath(`/teacher/test/${testId}/publish`)
  revalidatePath(`/teacher/test/${testId}/submissions`)
  return { success: true }
}

export async function unpublishAll(testId) {
  const session = await getTeacherSession()
  await verifyTestOwner(testId, session.teacher.id)

  await db.submission.updateMany({
    where: { testId },
    data: { isPublished: false },
  })

  revalidatePath(`/teacher/test/${testId}/publish`)
  return { success: true }
}

export async function publishSelected(testId, submissionIds) {
  const session = await getTeacherSession()
  await verifyTestOwner(testId, session.teacher.id)

  await db.submission.updateMany({
    where: { testId, id: { in: submissionIds } },
    data: { isPublished: true },
  })

  revalidatePath(`/teacher/test/${testId}/publish`)
  return { success: true }
}

export async function toggleSubmissionPublish(submissionId) {
  const session = await getTeacherSession()

  const submission = await db.submission.findFirst({
    where: { id: submissionId },
    include: { test: true },
  })
  if (!submission || submission.test.teacherId !== session.teacher.id) {
    return { errors: { general: 'Unauthorized' } }
  }

  await db.submission.update({
    where: { id: submissionId },
    data: { isPublished: !submission.isPublished },
  })

  revalidatePath(`/teacher/test/${submission.testId}/publish`)
  revalidatePath(`/teacher/test/${submission.testId}/submissions`)
  return { success: true }
}

export async function updateShowSettings(testId, formData) {
  const session = await getTeacherSession()
  await verifyTestOwner(testId, session.teacher.id)

  const showAnswers = formData.get('showAnswers') === 'on'
  const showPerQuestion = formData.get('showPerQuestion') === 'on'

  await db.test.update({
    where: { id: testId },
    data: { showAnswers, showPerQuestion },
  })

  revalidatePath(`/teacher/test/${testId}/publish`)
  return { success: true }
}
