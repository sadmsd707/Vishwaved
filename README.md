# 🎓 VishwaVed Academy — Educational Website & Online Assessment Platform

A modern, full-stack educational academy web application, admission inquiry portal, student management system, and secure online testing platform built with **Next.js 16 (App Router)**, **PostgreSQL (Supabase)**, **Server Actions**, and **Jose (JWT Sessions)**.

Designed for educational institutions to showcase academy offerings (courses, faculty, achievements), capture student admission inquiries with interactive captcha verification, manage students and attendance, and run a high-concurrency online examination engine for **100+ students simultaneously** with zero client-side data exposure and instantaneous server-side auto-grading.

---

## 🌟 Key Highlights & Features

### 🏫 Academy Website & Landing Experience
- **Modern & Vibrant Design System**: Clean white & slate canvas with royal teal and sunset orange accents, soft multi-layer shadows, and typography powered by Google's *Outfit* and *Plus Jakarta Sans*.
- **Interactive Navigation & Slide-Over Drawer**:
  - Sticky frosted navigation bar with academy branding.
  - Quick links for About, Inquiries, Courses, Faculty, and Contact.
  - Three-lines hamburger menu (☰) opening a sleek slide-out drawer with direct portal cards.
- **Inquiry Now & Free Online Registration Banner**:
  - **Dynamic Interactive Captcha**: Generates realistic distorted alphanumeric captchas on an HTML5 `<canvas>` with background noise, strike lines, and click-to-refresh.
  - **Comprehensive Form Fields**: Student Name, 10-digit Phone Number, Course Dropdown (JEE Mains, JEE Advance, NEET, MHT-CET, Foundation, 11th/12th Science), and Message.
  - **1-Click WhatsApp Connect**: Instant direct chat link pre-filling student name and chosen course.
  - **Key Academy Metrics**: 754+ Happy Students, 5+ Approved Courses, 12+ Certified Teachers.
- **Rich Multi-Section Content**:
  - **Hero Section**: Animated gradient orbs, inspiring tagline, and direct "Inquiry Now" & "Explore Courses" CTAs.
  - **Stats Ribbon**: Key achievements (500+ Students, 50+ Courses, 30+ Faculty, 15+ Years).
  - **About Us**: Academy mission, values, and campus building visual.
  - **Courses Grid**: Curated curriculum across JEE Mains, JEE Advance, NEET Medical, MHT-CET, and Foundation (Class 8–10).
  - **Facilities & Highlights**: Dedicated batches, experienced faculty, doubt-solving sessions, regular test series.
  - **Faculty Showcase**: Teacher profiles with qualifications and subject expertise.
  - **Student Testimonials**: Verified student success stories and star ratings.
  - **Contact & Enrollment**: Academy address in Baramati, contact phones, email, and direct WhatsApp links.

---

### 👨‍🏫 Faculty / Teacher Portal
- **Faculty Authentication**: Secure registration and login backed by Supabase PostgreSQL with `bcryptjs` password hashing (salt rounds: 12) and encrypted `httpOnly`, `sameSite: lax` session cookies via `jose`.
- **📬 Admission Enquiries Management (`/teacher/enquiries`)**:
  - **Real-Time Counters**: Total Inquiries, Pending Follow-up, Contacted, and Enrolled.
  - **Live Search & Filters**: Search by student name, phone number, message, or teacher notes; filter by status (*All, Pending, Contacted, Enrolled, Closed*) and course (*JEE, NEET, CET, Foundation*).
  - **1-Click WhatsApp & Call**: Directly launch WhatsApp chat with customized greeting or call the parent/student with a single click.
  - **Status & Internal Notes**: Update enquiry status on the fly and save private teacher follow-up notes.
- **👨‍🎓 Student Management (`/teacher/students`)**:
  - Add and manage enrolled students class-wise with DOB, student phone, and parent phone numbers.
  - Student ID acts as their official authentication credential.
- **📅 Daily Attendance Tracker (`/teacher/attendance`)**:
  - Mark and track daily student attendance (Present, Absent, Late) date-wise and class-wise.
- **📝 Test Management & Online Assessment Engine**:
  - Create and configure tests with custom title, instructions, time limits (with automatic countdown), and attempt limits.
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
- **Zero Friction Entry**: Students join tests instantly with just the **Test ID**, their **Full Name**, and **Roll Number / Student ID**.
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
| **Styling** | Vanilla CSS Design System (Clean Light Theme, Glassmorphism, Responsive) |
| **Database** | PostgreSQL ([Supabase](https://supabase.com/)) |
| **Database Client** | Pure JS `postgres.js` client + Prisma schema definition |
| **Auth & Security** | `jose` (HS256/AES JWT in httpOnly cookie), `bcryptjs` |

---

## 📁 Project Structure

```
├── actions/                  # Next.js Server Actions (No public API routes)
│   ├── auth.js               # Faculty sign-up, login, password hashing
│   ├── auth-redirect.js      # Logout action with navigation redirect
│   ├── enquiry.js            # Submit, update status, note, delete inquiries
│   ├── students.js           # Add, edit, delete enrolled student records
│   ├── attendance.js         # Save & query class-wise daily attendance
│   ├── test.js               # Test CRUD, code generation, toggle status
│   ├── questions.js          # Add, update, and delete questions
│   ├── submission.js         # Start test validation & auto-graded submission
│   └── publish.js            # Result publishing & visibility settings
├── app/                      # App Router Pages & Components
│   ├── components/           # Reusable UI Components
│   │   ├── Navbar.js         # Client navbar with animated 3-lines drawer
│   │   ├── InquirySection.js # Inquiry form with canvas captcha & WhatsApp CTA
│   │   ├── TeacherNav.js     # Teacher dashboard navigation bar & dropdown
│   │   └── StudentNav.js     # Student portal navigation bar
│   ├── globals.css           # Global design system, glassmorphism & responsive CSS
│   ├── layout.js             # Root layout with Google Fonts & viewport metadata
│   ├── page.js               # VishwaVed Academy landing page
│   ├── not-found.js          # Custom 404 page
│   ├── teacher/              # Faculty portal routes
│   │   ├── login/            # Faculty login
│   │   ├── dashboard/        # Faculty dashboard & test overview
│   │   ├── enquiries/        # Admission inquiries tracking & management
│   │   ├── students/         # Student roster & class-wise management
│   │   ├── attendance/       # Daily attendance sheet
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
├── public/                   # Static assets & background images
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

CREATE TABLE IF NOT EXISTS "Enquiry" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  course TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Student" (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  middle_name TEXT NOT NULL,
  surname TEXT NOT NULL,
  dob DATE NOT NULL,
  class TEXT NOT NULL,
  mobile TEXT NOT NULL,
  parent_mobile TEXT NOT NULL,
  mothers_name TEXT NOT NULL,
  teacher_id TEXT REFERENCES teacher(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Attendance" (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES "Student"(id) ON DELETE CASCADE,
  teacher_id TEXT NOT NULL REFERENCES teacher(id),
  date DATE NOT NULL,
  status TEXT NOT NULL,
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, date)
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

## 📖 Complete Platform Workflow

```mermaid
flowchart TD
    A[Visitor views Website & Fills Inquiry with Captcha] --> B[Inquiry saved to Database & WhatsApp Option]
    B --> C[Teacher Portal: Review Inquiries in /teacher/enquiries]
    C --> D[Teacher Contacts via 1-Click WhatsApp or Call]
    D --> E[Enrolled Students added in /teacher/students]
    E --> F[Daily Attendance tracked in /teacher/attendance]
    G[Teacher creates Online Test with MCQs/Numerical] --> H[Share Test Code with Students]
    H --> I[Students take Online Assessment in /student]
    I --> J[Server Auto-Grades Submissions & Publishes Results]
```

1. **Visitor Inquiry**: Prospective students complete the registration form with captcha validation.
2. **Teacher Inquiry Management**: Faculty views inquiries at `/teacher/enquiries`, updates status, and contacts leads via 1-click WhatsApp or call.
3. **Student Enrolment**: Enrolled students are added to `/teacher/students`.
4. **Attendance Marking**: Faculty tracks class-wise daily attendance at `/teacher/attendance`.
5. **Online Assessments**: Faculty creates tests, adds questions, and distributes test codes.
6. **Instant Auto-Grading & Publishing**: Students complete tests with live timers, answers are evaluated securely on the server, and results are published with detailed scorecards.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
