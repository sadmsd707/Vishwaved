# 🎓 VishwaVed Academy — Educational Website & Online Assessment Platform

A modern, full-stack educational academy web application and secure online testing platform built with **Next.js 16 (App Router)**, **PostgreSQL (Supabase)**, **Server Actions**, and **Jose (JWT Sessions)**.

Designed for educational institutions to showcase academy offerings (courses, faculty, achievements) while providing a high-concurrency online examination engine for **100+ students simultaneously** with zero client-side data exposure and instantaneous server-side auto-grading.

---

## 🌟 Key Highlights & Features

### 🏫 Academy Website & Landing Experience
- **Modern & Vibrant Light Design System**: Clean white & slate canvas with royal teal and sunset orange accents, soft multi-layer shadows, and typography powered by Google's *Outfit* and *Plus Jakarta Sans*.
- **Interactive Navigation & Slide-Over Drawer**:
  - Sticky frosted navigation bar with academy branding.
  - Three-lines hamburger menu (☰) in the upper corner opening a sleek slide-out drawer with quick links and direct portal cards.
- **Rich Multi-Section Content**:
  - **Hero Section**: Animated gradient orbs, inspiring tagline, and direct "Explore Courses" call-to-action.
  - **Stats Ribbon**: Key achievements (500+ Students, 50+ Courses, 30+ Faculty, 15+ Years).
  - **About Us**: Academy mission, values, and core differentiators.
  - **Courses Grid**: Curated curriculum across Science, Mathematics, Engineering (JEE/CET), Commerce, Competitive Exams (NEET), and Computer Science.
  - **Why VishwaVed**: Highlights covering expert faculty, modern labs, smart online testing, and proven results.
  - **Faculty Showcase**: Teacher profiles with qualifications and subject expertise.
  - **Student Testimonials**: Verified student success stories and star ratings.
  - **Contact & Enrollment**: Academy address in Baramati, contact phone, email, and direct registration links.

---

### 👨‍🏫 Faculty / Teacher Portal
- **Faculty Authentication**: Secure registration and login backed by Supabase PostgreSQL with `bcryptjs` password hashing (salt rounds: 12) and encrypted `httpOnly`, `sameSite: lax` session cookies via `jose`.
- **Test Management & Configuration**:
  - Create and configure tests with custom title, instructions, time limit (with automatic countdown), availability window, and attempt limits.
  - Automatically generates human-friendly unique test access codes (e.g., `TEST-7K3M9P`).
  - Toggle test active/inactive status in real time.
- **Rich Question Builder**:
  - **Multiple Choice Questions (MCQ)**: 4 configurable options (A, B, C, D) with single correct answer selection.
  - **Numerical Questions**: Exact answer matching with configurable floating-point tolerance ($\pm$ margin).
  - Configurable marks and optional solution explanations per question.
- **Real-Time Submissions & Grading**:
  - View all student submissions, roll numbers, timestamps, and auto-calculated scores.
  - Inspect individual student breakdowns (per-question answers vs correct keys, marks awarded).
- **Result Publishing Controls**:
  - Bulk publish / unpublish all results.
  - Granular per-student selective publishing.
  - Toggle whether students can view correct answers and explanations after publication.

---

### 📝 Student Portal
- **Zero Friction Entry**: Students join tests instantly with just the **Test ID**, their **Full Name**, and **Roll Number / Student ID**. No prior registration required.
- **Interactive Test Interface**:
  - Real-time countdown timer with visual progress indicator and color-coded urgency states.
  - Responsive layout optimized for smartphones, tablets, and desktop computers.
  - Automatic submission when the timer expires.
- **Published Results Portal**:
  - Clean student score card with animated circular percentage score meter.
  - Per-question breakdown showing student response, correct answer (if enabled by teacher), and solution explanations.

---

## 🔒 Security Architecture (Zero-Client-Leak Design)

1. **Zero Client APIs**: No `/api/*` endpoints are exposed. All state mutations and data submissions happen exclusively via encrypted Next.js **Server Actions**.
2. **Answer Key Protection**: Correct answers and solution explanations are **never selected** in SQL queries when serving tests to students. Answer keys physically never leave the server.
3. **Server-Side Auto-Grading**: Submissions are evaluated strictly inside server actions before storing results in the database.
4. **Session Security**: Faculty sessions are stored inside signed and encrypted `httpOnly` cookies using `jose` AES-GCM encryption, making them inaccessible to JavaScript/XSS.
5. **High Concurrency (100+ Students)**: Uses connection pooling with row-level transaction safety in PostgreSQL to handle simultaneous burst submissions smoothly.
6. **Cross-Platform Compatibility**: Uses pure JavaScript PostgreSQL communication (`postgres.js`), ensuring complete compatibility across Windows (x64 & ARM64), Linux, and macOS without native binary dependencies.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router + Server Components + Turbopack) |
| **Language** | JavaScript (ESM) / React 19 |
| **Styling** | Vanilla CSS Design System (Clean Light Theme, Mobile-First, Responsive) |
| **Database** | PostgreSQL ([Supabase](https://supabase.com/)) |
| **Database Client** | Pure JS `postgres.js` client + Prisma schema definition |
| **Auth & Security** | `jose` (HS256/AES JWT in httpOnly cookie), `bcryptjs` |

---

## 📁 Project Structure

```
├── actions/                  # Next.js Server Actions (No public API routes)
│   ├── auth.js               # Faculty sign-up, login, password hashing
│   ├── auth-redirect.js      # Logout action with navigation redirect
│   ├── test.js               # Test CRUD, code generation, toggle status
│   ├── questions.js          # Add, update, and delete questions
│   ├── submission.js         # Start test validation & auto-graded submission
│   └── publish.js            # Result publishing & visibility settings
├── app/                      # App Router Pages & Components
│   ├── components/           # Reusable UI Components
│   │   └── Navbar.js         # Client navbar with animated 3-lines drawer
│   ├── globals.css           # Global design system, light theme & animations
│   ├── layout.js             # Root layout with Google Fonts & viewport metadata
│   ├── page.js               # VishwaVed Academy landing page
│   ├── not-found.js          # Custom 404 page
│   ├── teacher/              # Faculty portal routes
│   │   ├── signup/           # Faculty registration
│   │   ├── login/            # Faculty login
│   │   ├── dashboard/        # Faculty dashboard & test overview
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
│   ├── db.js                 # Pure-JS PostgreSQL database client
│   ├── grading.js            # MCQ & Numerical server-side grading algorithms
│   └── session.js            # jose JWT cookie session manager
├── prisma/
│   └── schema.prisma         # Declarative database schema
├── .env.example              # Environment variable template
├── next.config.mjs           # Next.js configuration
└── README.md
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **PostgreSQL Database**: A [Supabase](https://supabase.com) project or local PostgreSQL instance.

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
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres"
SESSION_SECRET="generate-a-random-32-character-secret-key-here"
```

> **Note**: Do not include square brackets `[ ]` around your database password.

### 5. Initialize Database Tables
Execute the SQL schema in your Supabase SQL Editor:

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

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub.
2. Import the project into **[Vercel](https://vercel.com/)**.
3. In **Project Settings** → **Environment Variables**, add:
   - `DATABASE_URL`: Your Supabase connection string.
   - `SESSION_SECRET`: A secure 32+ character random string.
4. Click **Deploy**.

---

## 📖 Step-by-Step User Workflow

```mermaid
flowchart TD
    A[Faculty Registers or Logs in] --> B[Faculty Creates Test in Dashboard]
    B --> C[Add MCQs & Numerical Questions]
    C --> D[Share Generated Test Code: e.g. TEST-7F3A9C]
    D --> E[Students Access via Student Portal /student]
    E --> F[Students Complete Test with Live Timer]
    F --> G[Server Auto-Grades Submissions Instantly]
    G --> H[Faculty Reviews Submissions Dashboard]
    H --> I[Faculty Publishes Results]
    I --> J[Students View Published Scorecard & Breakdown]
```

1. **Faculty Registration**: Visit `/teacher/signup`, create an account, and access the Faculty Dashboard.
2. **Create a Test**: Click `+ Create Test`, specify the test title, duration, and rules.
3. **Add Questions**: Add Multiple Choice Questions (with 4 options) and Numerical Questions (with tolerance).
4. **Distribute Test ID**: Share the 6-character code with students.
5. **Student Access**: Students go to `/student`, enter the Test ID with their name and roll number.
6. **Take Test & Submit**: Students complete the assessment; upon submission or timer expiration, responses are auto-graded on the server.
7. **Publishing**: Faculty reviews submissions and publishes scores via `/teacher/test/[id]/publish`.
8. **View Scores**: Students check their results at `/student` under the "View Result" tab.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
