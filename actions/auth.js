'use server'

import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
import { setSession, destroySession } from '@/lib/session'

export async function signupTeacher(formData) {
  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim().toLowerCase()
  const password = formData.get('password')?.toString()

  const errors = {}
  if (!name || name.length < 2) errors.name = 'Name must be at least 2 characters.'
  if (!email || !email.includes('@')) errors.email = 'A valid email is required.'
  if (!password || password.length < 8) errors.password = 'Password must be at least 8 characters.'

  if (Object.keys(errors).length > 0) return { errors }

  const existing = await db.teacher.findUnique({ where: { email } })
  if (existing) return { errors: { email: 'An account with this email already exists.' } }

  const passwordHash = await bcrypt.hash(password, 12)
  await db.teacher.create({ data: { name, email, passwordHash } })

  return { success: true }
}

export async function loginTeacher(formData) {
  const email = formData.get('email')?.toString().trim().toLowerCase()
  const password = formData.get('password')?.toString()

  if (!email || !password) return { errors: { general: 'Email and password are required.' } }

  const teacher = await db.teacher.findUnique({ where: { email } })
  if (!teacher) return { errors: { general: 'Invalid email or password.' } }

  const valid = await bcrypt.compare(password, teacher.passwordHash)
  if (!valid) return { errors: { general: 'Invalid email or password.' } }

  await setSession({ teacher: { id: teacher.id, name: teacher.name, email: teacher.email } })
  redirect('/teacher/dashboard')
}

export async function logoutTeacher() {
  'use server'
  await destroySession()
  redirect('/teacher/login')
}
