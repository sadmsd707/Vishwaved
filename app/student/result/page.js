import { redirect } from 'next/navigation'

export default async function ResultEntryPage({ searchParams }) {
  const sp = await searchParams
  const code = sp.code?.toString().trim().toUpperCase()
  const name = sp.name?.toString().trim()
  const roll = sp.roll?.toString().trim()

  if (code && name && roll) {
    redirect(`/student/result/${code}?name=${encodeURIComponent(name)}&roll=${encodeURIComponent(roll)}`)
  }

  redirect('/student')
}
