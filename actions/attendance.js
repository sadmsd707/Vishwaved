'use server'

import { revalidatePath } from 'next/cache'
import crypto from 'crypto'
import db, { sql } from '@/lib/db'
import { getTeacherSession } from '@/lib/session'

export async function saveAttendance(dateStr, classStr, records) {
  try {
    const session = await getTeacherSession()
    const teacherId = session.teacher.id

    if (!dateStr) return { errors: { general: 'Date is required.' } }
    if (!records || !Array.isArray(records) || records.length === 0) {
      return { errors: { general: 'No student records provided.' } }
    }

    const date = new Date(dateStr)

    // Save/update attendance records
    for (const r of records) {
      const { studentId, status, remarks = '' } = r
      if (!studentId || !status) continue

      const id = `att_${crypto.randomBytes(8).toString('hex')}`

      // Raw upsert using Postgres ON CONFLICT
      await sql`
        INSERT INTO "Attendance" ("id", "student_id", "teacher_id", "date", "status", "remarks")
        VALUES (${id}, ${studentId}, ${teacherId}, ${date}, ${status}, ${remarks})
        ON CONFLICT ("student_id", "date")
        DO UPDATE SET
          "status" = EXCLUDED."status",
          "remarks" = EXCLUDED."remarks"
      `
    }

    revalidatePath('/teacher/attendance')
    return { success: true }
  } catch (err) {
    console.error('Save attendance error:', err)
    return { errors: { general: err.message || 'Failed to save attendance.' } }
  }
}
