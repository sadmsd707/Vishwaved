# 🚀 Vishwaved — TestFlow Online Testing Platform

A secure, high-concurrency online examination and assessment platform built with **Next.js 16 (App Router)**, **PostgreSQL**, **Server Actions**, and **Jose (JWT Sessions)**.

Designed specifically for educational institutions to conduct concurrent tests for **100+ students simultaneously** with zero client-side data exposure and instantaneous server-side auto-grading.

---

## 🌟 Key Highlights & Features

### 🎓 Teacher Features
- **Teacher Authentication**: Secure registration and login using `bcryptjs` (salt rounds: 12) with encrypted, `httpOnly`, `sameSite: lax` session cookies via `jose`.
- **Test Management**:
  - Create and configure tests with custom title, instructions, time limit (with automatic countdown), availability window, and attempt limits.
  - Automatically generates human-friendly unique test access codes (e.g., `TEST-7K3M9P`).
  - Toggle test active/inactive status at any time.
- **Question Types**:
  - **Multiple Choice Questions (MCQ)**: Configurable 4 options (A, B, C, D) with single correct answer selection.
  - **Numerical Questions**: Exact answer matching with optional configurable floating-point tolerance ($\pm$ margin).
  - Configurable marks and optional explanations per question.
- **Real-Time Submissions & Grading**:
  - View all student submissions, roll numbers, timestamps, and auto-calculated scores.
  - Inspect individual student breakdowns (per-question answers vs correct keys, marks awarded).
- **Result Publishing Controls**:
  - Bulk publish / unpublish all results.
  - Granular per-student selective publishing.
  - Toggle whether students can view correct answers and explanations after publication.

### 📝 Student Features
- **Zero Account Friction**: Students join instantly with just the **Test ID**, their **Full Name**, and **Roll Number/Student ID**.
- **Interactive Test Interface**:
  - Real-time countdown timer with visual progress indicator and color-coded urgency states.
  - Two display modes supported: **All questions at once** or **One-by-one question navigation**.
  - Automatic submission when the timer expires.
- **Published Results Portal**:
  - Clean student score card with animated circular percentage score meter.
  - Per-question breakdown showing student response, correct answer (if enabled by teacher), and solution explanations.

---

## 🔒 Security Architecture (Zero-Client-Leak Design)

1. **Zero Client APIs**: No `/api/*` endpoints are exposed. All state mutations and data submissions happen exclusively via encrypted Next.js **Server Actions**.
2. **Answer Key Protection**: Correct answers and solution explanations are **never selected** in SQL queries when serving tests to students. Answer keys physically never leave the server.
3. **Server-Side Auto-Grading**: Submissions are evaluated strictly inside server actions before storing results in the database.
4. **Session Security**: Teachers' sessions are stored inside signed and encrypted `httpOnly` cookies using `jose` AES-GCM encryption, making them inaccessible to JavaScript/XSS.
5. **High Concurrency (100+ Students)**: Uses connection pooling with row-level transaction safety in PostgreSQL to handle simultaneous burst submissions smoothly.
6. **Cross-Platform Compatibility**: Uses pure JavaScript PostgreSQL communication (`postgres.js`), ensuring complete compatibility across Windows (x64 & ARM64), Linux, and macOS without native binary dependencies.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router + Server Components + Turbopack) |
| **Language** | JavaScript (ESM) |
| **Styling** | Vanilla CSS Design System (Modern Dark Theme, Glassmorphism, Responsive) |
| **Database** | PostgreSQL |
| **DB Client** | Pure JS `postgres.js` client + Prisma schema definition |
| **Auth & Security** | `jose` (HS256/AES JWT in httpOnly cookie), `bcryptjs` |

---

## 📁 Project Structure

```
├── actions/                  # Next.js Server Actions (No API routes exposed)
│   ├── auth.js               # Teacher sign-up, login, session validation
│   ├── auth-redirect.js      # Logout action with navigation redirect
│   ├── test.js               # Test CRUD, code generation, toggle status
│   ├── questions.js          # Add, update, and delete questions
│   ├── submission.js         # Start test validation & auto-graded submission
│   └── publish.js            # Result publishing & visibility settings
├── app/                      # App Router Pages & Components
│   ├── globals.css           # Global design system & animations
│   ├── layout.js             # Root layout with typography
│   ├── page.js               # Landing page with teacher/student entry points
│   ├── not-found.js          # Custom 404 page
│   ├── teacher/              # Teacher portal routes
│   │   ├── signup/           # Teacher account creation
│   │   ├── login/            # Teacher login
│   │   ├── dashboard/        # Test overview and creation center
│   │   └── test/
│   │       ├── new/          # Create new test form
│   │       └── [testId]/
│   │           ├── page.js   # Test overview & code sharing
│   │           ├── edit/     # Edit test settings
│   │           ├── questions/# MCQ & Numerical question builder
│   │           ├── submissions/ # Student submissions table
│   │           │   └── [subId]/ # Individual student evaluation
│   │           └── publish/  # Result publishing controls
│   └── student/              # Student portal routes
│       ├── page.js           # Portal for taking tests or checking results
│       ├── test/[testCode]/  # Test taking interface & timer
│       ├── submitted/        # Submission confirmation
│       └── result/[testCode]/# Published result scorecard
├── lib/
│   ├── db.js                 # Pure-JS PostgreSQL database connection
│   ├── grading.js            # MCQ & Numerical server-side grading algorithms
│   └── session.js            # jose JWT cookie session manager
├── prisma/
│   └── schema.prisma         # Declarative schema (5 models)
├── .env.example              # Environment variable template
├── next.config.mjs           # Next.js configuration
└── README.md
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **PostgreSQL Database**: A local PostgreSQL instance or a free cloud database (e.g., [Neon.tech](https://neon.tech), [Supabase](https://supabase.com)).

### 2. Clone the Repository
```bash
git clone https://github.com/sadmsd707/Vishwaved.git
cd Vishwaved
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
DATABASE_URL="postgresql://username:password@localhost:5432/testplatform"
SESSION_SECRET="generate-a-random-32-character-secret-key-here"
```

### 5. Initialize the Database Schema
You can push the schema using Prisma:
```bash
npx prisma db push
```

*Or execute the following SQL table definitions in your PostgreSQL database directly:*

```sql
CREATE TABLE IF NOT EXISTS teacher (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS test (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  time_limit INTEGER,
  start_at TIMESTAMP WITH TIME ZONE,
  end_at TIMESTAMP WITH TIME ZONE,
  test_code TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  show_answers BOOLEAN DEFAULT FALSE,
  show_per_question BOOLEAN DEFAULT TRUE,
  max_attempts INTEGER DEFAULT 1,
  display_mode TEXT DEFAULT 'ALL',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  teacher_id TEXT NOT NULL REFERENCES teacher(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS question (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL REFERENCES test(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  text TEXT NOT NULL,
  options JSONB,
  correct_answer TEXT NOT NULL,
  tolerance DOUBLE PRECISION,
  marks INTEGER DEFAULT 1,
  explanation TEXT,
  "order" INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS submission (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL REFERENCES test(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  student_roll TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_score DOUBLE PRECISION DEFAULT 0,
  max_score DOUBLE PRECISION DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS answer (
  id TEXT PRIMARY KEY,
  submission_id TEXT NOT NULL REFERENCES submission(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL REFERENCES question(id) ON DELETE CASCADE,
  student_answer TEXT NOT NULL,
  marks_awarded DOUBLE PRECISION DEFAULT 0,
  is_correct BOOLEAN DEFAULT FALSE
);
```

### 6. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Step-by-Step User Workflow

```mermaid
flowchart TD
    A[Teacher Registers/Logs in] --> B[Teacher Creates Test]
    B --> C[Add MCQs & Numerical Questions]
    C --> D[Share Test Code: e.g. TEST-7F3A9C]
    D --> E[100+ Students Access via /student]
    E --> F[Students Submit Test Responses]
    F --> G[Server Evaluates & Grades Answers]
    G --> H[Teacher Views Submissions Dashboard]
    H --> I[Teacher Publishes Results]
    I --> J[Students View Scorecard & Breakdown]
```

1. **Teacher Registration**: Visit `/teacher/signup`, create an account, and access the Teacher Dashboard.
2. **Create a Test**: Click `+ Create Test`, set the title, time limit, and test settings.
3. **Add Questions**: Add MCQs with 4 options and numerical questions with tolerance values.
4. **Distribute Test ID**: Share the 6-character access code with students.
5. **Student Access**: Students open `/student`, enter the Test ID along with their name and roll number.
6. **Student Submission**: Student completes the test with active timer; responses are submitted and automatically graded on the server.
7. **Publishing**: Teacher reviews submissions under `/teacher/test/[id]/submissions` and publishes scores via `/teacher/test/[id]/publish`.
8. **View Scores**: Students check their scores at `/student` (View Result tab).

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
