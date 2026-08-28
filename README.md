# TestFlow — Online Test Platform

A secure, server-side rendered online testing platform built with **Next.js 15**, **Prisma**, and **PostgreSQL**.

## Features

- 🎓 **Teacher**: Create tests, add MCQ & numerical questions, view submissions, publish results
- 📝 **Student**: Take tests with timer, auto-graded on submission, view published results
- 🔒 **Secure**: No API endpoints, correct answers never reach the browser, httpOnly sessions

## Quick Setup

### 1. Prerequisites
- Node.js 18+
- PostgreSQL database (local or [Neon.tech](https://neon.tech) free tier)

### 2. Configure Environment

Edit `.env` with your database URL and a secret key:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/testplatform"
SESSION_SECRET="your-random-32-character-secret-here"
```

### 3. Install Dependencies & Set Up Database

```bash
npm install
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Architecture

| Aspect | Implementation |
|---|---|
| Framework | Next.js 15 App Router |
| Database | PostgreSQL via Prisma ORM |
| Session | `jose` JWT in httpOnly cookie (server-side only) |
| Password | bcryptjs (cost factor 12) |
| No API routes | All mutations via Server Actions |
| Correct answers | Never sent to browser — grading runs server-side |

## Pages

### Teacher
- `/` — Landing
- `/teacher/signup` — Register
- `/teacher/login` — Login
- `/teacher/dashboard` — All tests
- `/teacher/test/new` — Create test
- `/teacher/test/[id]` — Test overview
- `/teacher/test/[id]/questions` — Add/manage questions
- `/teacher/test/[id]/submissions` — View all student scores
- `/teacher/test/[id]/submissions/[subId]` — Per-student answer breakdown
- `/teacher/test/[id]/publish` — Publish/unpublish results
- `/teacher/test/[id]/edit` — Edit test settings

### Student
- `/student` — Take Test / View Result portal
- `/student/test/[testCode]` — Take the test
- `/student/submitted` — Confirmation after submit
- `/student/result/[testCode]` — View published result

## Security Notes

- ✅ Zero `/api/*` routes — network tab shows only HTML
- ✅ `correctAnswer` field is **never** selected in student-facing DB queries
- ✅ Grading runs inside `submitTest` Server Action before any response
- ✅ All teacher routes require valid session cookie
- ✅ All test mutations verify teacher ownership
- ✅ Student results only rendered if `isPublished = true`
