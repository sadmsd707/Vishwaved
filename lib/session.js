import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const COOKIE_NAME = 'tf_session'
const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'fallback-secret-change-in-production-32ch'
)

/**
 * Encrypt a payload into a signed+encrypted JWT stored in httpOnly cookie.
 * The cookie is httpOnly — never readable by client JavaScript.
 */
export async function setSession(payload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(SECRET)

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  })
}

/**
 * Read and verify the session cookie. Returns null if missing/invalid.
 */
export async function getSession() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (!token) return null
    const { payload } = await jwtVerify(token, SECRET)
    return payload
  } catch {
    return null
  }
}

/**
 * Require a teacher session — redirect to login if not present.
 */
export async function getTeacherSession() {
  const session = await getSession()
  if (!session?.teacher) {
    redirect('/teacher/login')
  }
  return session
}

/**
 * Destroy the session cookie.
 */
export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, '', { maxAge: 0, path: '/' })
}

// ─── Student Session ─────────────────────────────────────────────────────────

const STUDENT_COOKIE = 'st_session'

/**
 * Set student session cookie.
 */
export async function setStudentSession(payload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(SECRET)

  const cookieStore = await cookies()
  cookieStore.set(STUDENT_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  })
}

/**
 * Read student session. Returns null if missing/invalid.
 */
export async function getStudentSession() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(STUDENT_COOKIE)?.value
    if (!token) return null
    const { payload } = await jwtVerify(token, SECRET)
    return payload
  } catch {
    return null
  }
}

/**
 * Require student session — redirect to login if not present.
 */
export async function getStudentSessionRequired() {
  const session = await getStudentSession()
  if (!session?.student) {
    redirect('/student')
  }
  return session
}

/**
 * Destroy student session cookie.
 */
export async function destroyStudentSession() {
  const cookieStore = await cookies()
  cookieStore.set(STUDENT_COOKIE, '', { maxAge: 0, path: '/' })
}
