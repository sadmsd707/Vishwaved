'use server'

import { revalidatePath } from 'next/cache'
import crypto from 'crypto'
import { sql } from '@/lib/db'
import { getTeacherSession } from '@/lib/session'

// Ensure table exists
async function ensureResourceTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS "Resource" (
      "id" TEXT PRIMARY KEY,
      "teacher_id" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "description" TEXT,
      "type" TEXT NOT NULL DEFAULT 'LINK',
      "url" TEXT NOT NULL,
      "subject" TEXT,
      "target_class" TEXT,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `
}

/**
 * Teacher action: Create a new resource
 */
export async function createResource(data) {
  try {
    const session = await getTeacherSession()
    const teacher = session.teacher
    await ensureResourceTable()

    const title = data.title?.trim()
    const description = data.description?.trim() || null
    const type = data.type || 'LINK'
    const url = data.url?.trim()
    const subject = data.subject?.trim() || null
    const targetClass = data.targetClass?.trim() || null

    if (!title) return { error: 'Please enter a title.' }
    if (!url) return { error: 'Please enter a URL or link.' }

    const id = `res_${crypto.randomBytes(8).toString('hex')}`

    await sql`
      INSERT INTO "Resource" ("id", "teacher_id", "title", "description", "type", "url", "subject", "target_class", "created_at")
      VALUES (${id}, ${teacher.id}, ${title}, ${description}, ${type}, ${url}, ${subject}, ${targetClass}, NOW())
    `

    revalidatePath('/teacher/resources')
    return { success: true, id }
  } catch (err) {
    console.error('Create resource error:', err)
    return { error: err.message || 'Failed to create resource.' }
  }
}

/**
 * Teacher action: Delete a resource
 */
export async function deleteResource(id) {
  try {
    const session = await getTeacherSession()
    const teacher = session.teacher
    await ensureResourceTable()

    await sql`
      DELETE FROM "Resource"
      WHERE "id" = ${id} AND "teacher_id" = ${teacher.id}
    `

    revalidatePath('/teacher/resources')
    return { success: true }
  } catch (err) {
    console.error('Delete resource error:', err)
    return { error: err.message || 'Failed to delete resource.' }
  }
}

/**
 * Teacher action: Update a resource
 */
export async function updateResource(id, data) {
  try {
    const session = await getTeacherSession()
    const teacher = session.teacher
    await ensureResourceTable()

    const title = data.title?.trim()
    const description = data.description?.trim() || null
    const type = data.type || 'LINK'
    const url = data.url?.trim()
    const subject = data.subject?.trim() || null
    const targetClass = data.targetClass?.trim() || null

    if (!title) return { error: 'Please enter a title.' }
    if (!url) return { error: 'Please enter a URL or link.' }

    await sql`
      UPDATE "Resource"
      SET "title" = ${title}, "description" = ${description}, "type" = ${type},
          "url" = ${url}, "subject" = ${subject}, "target_class" = ${targetClass}
      WHERE "id" = ${id} AND "teacher_id" = ${teacher.id}
    `

    revalidatePath('/teacher/resources')
    return { success: true }
  } catch (err) {
    console.error('Update resource error:', err)
    return { error: err.message || 'Failed to update resource.' }
  }
}

/**
 * Fetch all resources (for teacher — their own)
 */
export async function getTeacherResources() {
  try {
    await ensureResourceTable()
    const session = await getTeacherSession()
    const teacher = session.teacher

    const rows = await sql`
      SELECT * FROM "Resource"
      WHERE "teacher_id" = ${teacher.id}
      ORDER BY "created_at" DESC
    `
    return rows.map((r) => ({
      id: r.id,
      teacherId: r.teacher_id,
      title: r.title,
      description: r.description,
      type: r.type,
      url: r.url,
      subject: r.subject,
      targetClass: r.target_class,
      createdAt: r.created_at,
    }))
  } catch (err) {
    console.error('Get teacher resources error:', err)
    return []
  }
}

/**
 * Fetch resources visible to a student (by their class)
 */
export async function getStudentResources(studentClass) {
  try {
    await ensureResourceTable()

    // Students see resources where target_class matches theirs OR target_class is null (shared with all)
    const rows = await sql`
      SELECT r.*, t."name" as teacher_name
      FROM "Resource" r
      JOIN "Teacher" t ON t."id" = r."teacher_id"
      WHERE r."target_class" IS NULL OR r."target_class" = '' OR r."target_class" = ${studentClass}
      ORDER BY r."created_at" DESC
    `
    return rows.map((r) => ({
      id: r.id,
      teacherId: r.teacher_id,
      teacherName: r.teacher_name,
      title: r.title,
      description: r.description,
      type: r.type,
      url: r.url,
      subject: r.subject,
      targetClass: r.target_class,
      createdAt: r.created_at,
    }))
  } catch (err) {
    console.error('Get student resources error:', err)
    return []
  }
}
