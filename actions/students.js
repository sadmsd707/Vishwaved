'use server'

import { revalidatePath } from 'next/cache'
import db from '@/lib/db'
import { getTeacherSession } from '@/lib/session'

export async function addStudent(formData) {
  try {
    const session = await getTeacherSession()
    const teacherId = session.teacher.id

    const studentId = formData.get('studentId')?.toString().trim()
    const firstName = formData.get('firstName')?.toString().trim()
    const middleName = formData.get('middleName')?.toString().trim()
    const surname = formData.get('surname')?.toString().trim()
    const dob = formData.get('dob')?.toString().trim()
    const studentClass = formData.get('class')?.toString().trim()
    const mobile = formData.get('mobile')?.toString().trim()
    const parentMobile = formData.get('parentMobile')?.toString().trim()
    const mothersName = formData.get('mothersName')?.toString().trim()

    const errors = {}
    if (!studentId || studentId.length < 2) errors.studentId = 'Student ID is required (min 2 characters).'
    if (!firstName) errors.firstName = 'First name is required.'
    if (!middleName) errors.middleName = 'Middle name is required.'
    if (!surname) errors.surname = 'Surname is required.'
    if (!dob) errors.dob = 'Date of birth is required.'
    if (!studentClass) errors.class = 'Class is required.'
    if (!mobile || mobile.length < 10) errors.mobile = 'Valid mobile number is required.'
    if (!parentMobile || parentMobile.length < 10) errors.parentMobile = 'Valid parent mobile is required.'
    if (!mothersName) errors.mothersName = "Mother's name is required."

    if (Object.keys(errors).length > 0) return { errors }

    // Check if student ID already exists
    const existing = await db.student.findUnique({ where: { id: studentId } })
    if (existing) return { errors: { studentId: 'This Student ID is already taken. Choose a different one.' } }

    await db.student.create({
      data: {
        id: studentId,
        firstName,
        middleName,
        surname,
        dob: new Date(dob),
        class: studentClass,
        mobile,
        parentMobile,
        mothersName,
        teacherId,
      },
    })

    revalidatePath('/teacher/students')
    return { success: true, studentId }
  } catch (err) {
    console.error('Add student error:', err)
    return { errors: { general: err.message || 'Failed to add student. Please try again.' } }
  }
}

export async function deleteStudent(formData) {
  try {
    const session = await getTeacherSession()
    const studentId = formData.get('studentId')?.toString()

    if (!studentId) return { errors: { general: 'Student ID is required.' } }

    // Verify the student belongs to this teacher
    const student = await db.student.findUnique({ where: { id: studentId } })
    if (!student || student.teacherId !== session.teacher.id) {
      return { errors: { general: 'Student not found.' } }
    }

    await db.student.delete({ where: { id: studentId } })
    revalidatePath('/teacher/students')
    return { success: true }
  } catch (err) {
    console.error('Delete student error:', err)
    return { errors: { general: err.message || 'Failed to delete student.' } }
  }
}

export async function editStudent(formData) {
  try {
    const session = await getTeacherSession()
    const studentId = formData.get('studentId')?.toString().trim()
    const firstName = formData.get('firstName')?.toString().trim()
    const middleName = formData.get('middleName')?.toString().trim()
    const surname = formData.get('surname')?.toString().trim()
    const dob = formData.get('dob')?.toString().trim()
    const studentClass = formData.get('class')?.toString().trim()
    const mobile = formData.get('mobile')?.toString().trim()
    const parentMobile = formData.get('parentMobile')?.toString().trim()
    const mothersName = formData.get('mothersName')?.toString().trim()

    const errors = {}
    if (!studentId) errors.general = 'Student ID is missing.'
    if (!firstName) errors.firstName = 'First name is required.'
    if (!middleName) errors.middleName = 'Middle name is required.'
    if (!surname) errors.surname = 'Surname is required.'
    if (!dob) errors.dob = 'Date of birth is required.'
    if (!studentClass) errors.class = 'Class is required.'
    if (!mobile || mobile.length < 10) errors.mobile = 'Valid mobile number is required.'
    if (!parentMobile || parentMobile.length < 10) errors.parentMobile = 'Valid parent mobile is required.'
    if (!mothersName) errors.mothersName = "Mother's name is required."

    if (Object.keys(errors).length > 0) return { errors }

    // Verify the student belongs to this teacher
    const student = await db.student.findUnique({ where: { id: studentId } })
    if (!student || student.teacherId !== session.teacher.id) {
      return { errors: { general: 'Student not found or access denied.' } }
    }

    await db.student.update({
      where: { id: studentId },
      data: {
        firstName,
        middleName,
        surname,
        dob: new Date(dob),
        class: studentClass,
        mobile,
        parentMobile,
        mothersName,
      },
    })

    revalidatePath('/teacher/students')
    return { success: true }
  } catch (err) {
    console.error('Edit student error:', err)
    return { errors: { general: err.message || 'Failed to update student.' } }
  }
}
