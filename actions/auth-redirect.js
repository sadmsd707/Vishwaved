'use server'
import { destroySession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function logoutTeacher() {
  await destroySession()
  redirect('/teacher/login')
}
