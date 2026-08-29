'use server'

import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
import { setSession, destroySession } from '@/lib/session'

export async function signupTeacher(formData) {
  return { errors: { general: 'Registration is closed. Please contact the administrator.' } }
}

export async function loginTeacher(formData) {
  let shouldRedirect = false
  try {
    const email = formData.get('email')?.toString().trim().toLowerCase()
    const password = formData.get('password')?.toString()

    if (!email || !password) return { errors: { general: 'Email and password are required.' } }

    const teacher = await db.teacher.findUnique({ where: { email } })
    if (!teacher) return { errors: { general: 'Invalid email or password.' } }

    const valid = await bcrypt.compare(password, teacher.passwordHash)
    if (!valid) return { errors: { general: 'Invalid email or password.' } }

    await setSession({ teacher: { id: teacher.id, name: teacher.name, email: teacher.email } })
    shouldRedirect = true
  } catch (err) {
    console.error('Login error:', err)
    return { errors: { general: err.message || 'Invalid email or password.' } }
  }

  if (shouldRedirect) {
    redirect('/teacher/dashboard')
  }
}

export async function logoutTeacher() {
  'use server'
  await destroySession()
  redirect('/teacher/login')
}
