'use server'

import { revalidatePath } from 'next/cache'
import crypto from 'crypto'
import db, { sql } from '@/lib/db'
import { getTeacherSession } from '@/lib/session'

// Ensure table exists
async function ensureEnquiryTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS "Enquiry" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT NOT NULL,
      "phone" TEXT NOT NULL,
      "course" TEXT NOT NULL,
      "message" TEXT,
      "status" TEXT NOT NULL DEFAULT 'PENDING',
      "notes" TEXT,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `
}

/**
 * Public action: Submit inquiry from Landing Page
 */
export async function submitInquiry(data) {
  try {
    await ensureEnquiryTable()

    const name = data.name?.trim()
    const phone = data.phone?.trim()
    const course = data.course?.trim()
    const message = data.message?.trim() || null

    if (!name) return { error: 'Please enter your name.' }
    if (!phone || phone.length < 10) return { error: 'Please enter a valid 10-digit phone number.' }
    if (!course) return { error: 'Please select a course.' }

    const id = `enq_${crypto.randomBytes(8).toString('hex')}`

    await sql`
      INSERT INTO "Enquiry" ("id", "name", "phone", "course", "message", "status", "created_at")
      VALUES (${id}, ${name}, ${phone}, ${course}, ${message}, 'PENDING', NOW())
    `

    revalidatePath('/teacher/enquiries')
    return { success: true, id }
  } catch (err) {
    console.error('Submit inquiry error:', err)
    return { error: err.message || 'Failed to submit inquiry. Please try again.' }
  }
}

/**
 * Teacher action: Update enquiry status
 */
export async function updateEnquiryStatus(id, newStatus) {
  try {
    await getTeacherSession() // Require teacher authentication
    await ensureEnquiryTable()

    const validStatuses = ['PENDING', 'CONTACTED', 'ENROLLED', 'CLOSED']
    if (!validStatuses.includes(newStatus)) {
      return { error: 'Invalid status provided.' }
    }

    await sql`
      UPDATE "Enquiry"
      SET "status" = ${newStatus}
      WHERE "id" = ${id}
    `

    revalidatePath('/teacher/enquiries')
    return { success: true }
  } catch (err) {
    console.error('Update enquiry status error:', err)
    return { error: err.message || 'Failed to update status.' }
  }
}

/**
 * Teacher action: Update enquiry notes
 */
export async function updateEnquiryNotes(id, notes) {
  try {
    await getTeacherSession()
    await ensureEnquiryTable()

    await sql`
      UPDATE "Enquiry"
      SET "notes" = ${notes}
      WHERE "id" = ${id}
    `

    revalidatePath('/teacher/enquiries')
    return { success: true }
  } catch (err) {
    console.error('Update enquiry notes error:', err)
    return { error: err.message || 'Failed to update notes.' }
  }
}

/**
 * Teacher action: Delete an enquiry
 */
export async function deleteEnquiry(id) {
  try {
    await getTeacherSession()
    await ensureEnquiryTable()

    await sql`
      DELETE FROM "Enquiry"
      WHERE "id" = ${id}
    `

    revalidatePath('/teacher/enquiries')
    return { success: true }
  } catch (err) {
    console.error('Delete enquiry error:', err)
    return { error: err.message || 'Failed to delete enquiry.' }
  }
}

/**
 * Fetch all enquiries for teacher
 */
export async function getEnquiriesList() {
  try {
    await ensureEnquiryTable()
    const rows = await sql`
      SELECT * FROM "Enquiry"
      ORDER BY "created_at" DESC
    `
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      phone: r.phone,
      course: r.course,
      message: r.message,
      status: r.status,
      notes: r.notes,
      createdAt: r.created_at,
    }))
  } catch (err) {
    console.error('Get enquiries error:', err)
    return []
  }
}
