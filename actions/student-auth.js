'use server'

import { redirect } from 'next/navigation'
import db from '@/lib/db'
import { setStudentSession, destroyStudentSession } from '@/lib/session'

export async function loginStudent(formData) {
  try {
    const studentId = formData.get('studentId')?.toString().trim()
    const dob = formData.get('dob')?.toString().trim()

    if (!studentId) return { errors: { studentId: 'Student ID is required.' } }
    if (!dob) return { errors: { dob: 'Date of birth is required.' } }

    // Find student
    const student = await db.student.findUnique({ where: { id: studentId } })
    if (!student) return { errors: { studentId: 'Invalid Student ID.' } }

    // Verify DOB
    const studentDob = new Date(student.dob).toISOString().split('T')[0]
    const inputDob = new Date(dob).toISOString().split('T')[0]
    if (studentDob !== inputDob) return { errors: { dob: 'Date of birth does not match.' } }

    // Set session
    const fullName = `${student.firstName} ${student.middleName} ${student.surname}`
    await setStudentSession({
      student: {
        id: student.id,
        name: fullName,
        class: student.class,
      },
    })
  } catch (err) {
    console.error('Student login error:', err)
    return { errors: { general: err.message || 'Login failed. Please try again.' } }
  }

  redirect('/student/dashboard')
}

export async function logoutStudent() {
  await destroyStudentSession()
  redirect('/')
}
