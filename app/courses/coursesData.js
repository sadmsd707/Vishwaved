export const COURSES_DATA = {
  'jee-mains': {
    slug: 'jee-mains',
    title: 'JEE (Main) Coaching & Test Series',
    shortTitle: 'JEE (Mains)',
    tag: 'Engineering Entrance',
    badge: 'National Level (NTA)',
    icon: '⚙️',
    heroTagline: 'Master Concepts, Accelerate Problem Solving & Secure Top Percentiles in JEE Main',
    description: 'The Joint Entrance Examination (JEE Main) is the premier national-level engineering entrance exam conducted by the National Testing Agency (NTA). It serves as the gateway for admissions to prestigious National Institutes of Technology (NITs), Indian Institutes of Information Technology (IIITs), Centrally Funded Technical Institutes (CFTIs), and acts as the screening test for JEE Advanced.',
    inquiryCourseName: 'JEE (Mains)',
    quickStats: [
      { label: 'Conducting Body', val: 'NTA (National Testing Agency)', icon: '🏛️' },
      { label: 'Exam Mode', val: 'Computer Based Test (CBT)', icon: '💻' },
      { label: 'Duration', val: '3 Hours (180 Minutes)', icon: '⏱️' },
      { label: 'Total Marks', val: '300 Marks (75 Qs to attempt)', icon: '🎯' },
      { label: 'Frequency', val: '2 Sessions (January & April)', icon: '📅' },
      { label: 'Target Institutes', val: 'NITs, IIITs, CFTIs & State Top Colleges', icon: '🎓' },
    ],
    eligibility: {
      qualification: 'Passed Class 12th / Qualifying examination in 2024, 2025 or appearing in 2026.',
      subjects: 'Compulsory subjects: Physics and Mathematics, along with one of Chemistry/Biotechnology/Biology/Technical Vocational Subject.',
      ageLimit: 'No strict age limit for appearing in JEE Main (institutes may have individual criteria).',
      attempts: 'Can appear for JEE Main for 3 consecutive years from the year of passing Class 12.',
      admissionCriteria: 'Minimum 75% marks in Class 12 board examination (65% for SC/ST) or top 20 percentile in respective board.',
    },
    examPattern: {
      totalQuestions: 90,
      attemptQuestions: 75,
      totalMarks: 300,
      duration: '3 Hours (180 Minutes)',
      markingScheme: '+4 for each correct answer, -1 for each incorrect answer, 0 for unattempted questions.',
      sections: [
        {
          subject: 'Physics',
          mcqs: '20 MCQs',
          numerical: '10 Numerical (Attempt any 5)',
          totalMarks: 100,
          highlight: 'Concept application, formulae mastery & numerical speed',
        },
        {
          subject: 'Chemistry',
          mcqs: '20 MCQs',
          numerical: '10 Numerical (Attempt any 5)',
          totalMarks: 100,
          highlight: 'Physical calculations, Organic mechanisms & NCERT Inorganic recall',
        },
        {
          subject: 'Mathematics',
          mcqs: '20 MCQs',
          numerical: '10 Numerical (Attempt any 5)',
          totalMarks: 100,
          highlight: 'Multi-step calculus, coordinate geometry & algebra precision',
        },
      ],
    },
    syllabusHighlights: [
      {
        subject: 'Physics',
        topics: [
          'Kinematics, Laws of Motion & Work Power Energy',
          'Rotational Motion & Gravitation',
          'Thermodynamics & Kinetic Theory of Gases',
          'Electrostatics, Current Electricity & Magnetism',
          'Optics, Wave Optics & Electromagnetic Induction',
          'Modern Physics, Atoms & Nuclei',
        ],
      },
      {
        subject: 'Chemistry',
        topics: [
          'Physical: Mole Concept, Atomic Structure, Thermodynamics, Chemical Kinetics, Solutions',
          'Inorganic: Periodic Classification, Chemical Bonding, Coordination Compounds, p/d/f Block',
          'Organic: General Organic Chemistry (GOC), Hydrocarbons, Carbonyl Compounds, Biomolecules',
        ],
      },
      {
        subject: 'Mathematics',
        topics: [
          'Calculus: Limits, Continuity, Differentiation, Definite Integrals, Differential Equations',
          'Algebra: Matrices & Determinants, Complex Numbers, Sequences & Series, Probability',
          'Coordinate Geometry: Straight Lines, Circles, Parabola, Ellipse, Hyperbola',
          'Vectors & 3D Geometry, Trigonometry',
        ],
      },
    ],
    vishwvedFeatures: [
      {
        title: 'NTA-Pattern Mock Test Series',
        desc: 'Regular tests on our exact CBT online testing platform with instant scorecards, negative-mark analytics, and AIR percentile prediction.',
        icon: '🖥️',
      },
      {
        title: 'Rigorous Daily Practice Problems (DPP)',
        desc: 'Graded problem sets categorized by difficulty level (Foundation → JEE Main Level → Tricky Numerical questions).',
        icon: '📝',
      },
      {
        title: 'Dedicated Daily Doubt Solving',
        desc: 'One-on-one doubt resolution sessions with subject experts to ensure zero conceptual backlog.',
        icon: '💡',
      },
      {
        title: '15+ Years Solved PYQ Banks',
        desc: 'Topic-wise solved previous year question modules with multiple shortcut solution methods.',
        icon: '📚',
      },
      {
        title: 'Time & Accuracy Coaching',
        desc: 'Special speed drills and smart question elimination strategies to maximize attempts within 180 minutes.',
        icon: '⚡',
      },
      {
        title: 'Comprehensive Study Material',
        desc: 'Concise theory notes, mind maps, formula sheets, and curated question banks for fast revision.',
        icon: '📖',
      },
    ],
    batches: [
      {
        name: '2-Year Integrated Classroom Program',
        target: 'Students entering Class 11',
        duration: '2 Years (Class 11 + Class 12 + JEE Main)',
        schedule: 'Daily Classroom / Hybrid lectures + Weekly Online Mock Tests',
        features: ['Full Board + JEE Main syllabus sync', 'Continuous mentoring & parent progress reports', 'Exhaustive test series with 50+ full tests'],
      },
      {
        name: '1-Year Target / Repeater Batch',
        target: 'Class 12 Passed / Dropper Students',
        duration: '1 Year (Intensive Rapid Coverage)',
        schedule: '6 Days a week intensive coaching + Full Length NTA CBTs',
        features: ['High-speed concept recap + 5,000+ advanced numerical solving', 'Personal weakness diagnosis & targeted score boosting', 'Special focus on high-weightage chapters'],
      },
      {
        name: 'JEE Main Crash Course & Test Series',
        target: 'Class 12 Appearing Students',
        duration: '3 to 4 Months (Pre-Exam Sprint)',
        schedule: 'Daily revision sessions + All-India Level CBT Practice',
        features: ['High-yield topic rapid revision', '30+ Part and Full Syllabus Mock Tests', 'Time management & negative mark reduction drills'],
      },
    ],
    faqs: [
      {
        q: 'How many attempts can a student take for JEE Main?',
        a: 'A candidate can appear for JEE (Main) in 3 consecutive years starting from the year of passing their Class 12 board examination. In each academic year, NTA conducts 2 sessions (usually in January and April), and the best score of the two is considered.',
      },
      {
        q: 'How does VishwaVed prepare students for the Computer Based Test (CBT)?',
        a: 'VishwaVed provides an in-house online testing platform that strictly replicates the real NTA test interface. Students practice weekly full-length CBTs to master interface navigation, time allocation, and review tagging.',
      },
      {
        q: 'Are Board exams covered alongside JEE Main preparation?',
        a: 'Yes. Our 2-Year integrated curriculum is synchronized with State Board and CBSE syllabi, ensuring students score 90%+ in board exams while securing top JEE percentiles.',
      },
      {
        q: 'What is the minimum percentile required for NITs and IIITs?',
        a: 'While cutoffs vary each year and by branch/category, securing 97+ percentile generally provides strong admission chances into top NITs and IIITs across computer science and core engineering branches.',
      },
    ],
  },

  'jee-advanced': {
    slug: 'jee-advanced',
    title: 'JEE (Advanced) / IIT Prep Coaching',
    shortTitle: 'JEE (Advance)',
    tag: 'IIT Preparation',
    badge: 'IIT Organised / Elite Tier',
    icon: '🚀',
    heroTagline: 'Deep Conceptual Mastery, Multi-Concept Problem Solving & Gateway to IITs',
    description: 'JEE (Advanced) is one of the world’s most competitive and intellectually demanding entrance examinations, conducted by the premier Indian Institutes of Technology (IITs). It tests pure analytical thinking, multi-disciplinary concept linkage, and deep problem-solving skills to grant admission to the 23 IITs and IISc Bangalore.',
    inquiryCourseName: 'JEE (Advance)',
    quickStats: [
      { label: 'Conducting Body', val: 'One of 7 Zonal IITs (on rotation)', icon: '🏛️' },
      { label: 'Exam Mode', val: 'Computer Based Test (CBT)', icon: '💻' },
      { label: 'Exam Structure', val: '2 Mandatory Papers (Paper 1 & Paper 2)', icon: '📑' },
      { label: 'Duration', val: '6 Hours Total (3h Morning + 3h Afternoon)', icon: '⏱️' },
      { label: 'Frequency', val: 'Once a year (May / June)', icon: '📅' },
      { label: 'Target Institutes', val: '23 IITs, IISc Bangalore, RGIPT, IIPE', icon: '🏆' },
    ],
    eligibility: {
      qualification: 'Must be among the top 2,50,000 successful candidates in JEE (Main) across all categories.',
      academicCriteria: 'Must have passed Class 12 or equivalent with Physics, Chemistry, and Mathematics.',
      ageLimit: 'Candidates should have been born on or after the official cutoff year set by the organizing IIT.',
      attempts: 'A candidate can attempt JEE (Advanced) a maximum of TWO times in consecutive years.',
      class12Performance: 'Minimum 75% aggregate marks in 12th board (65% for SC/ST/PwD) or be in the top 20 percentile.',
    },
    examPattern: {
      totalQuestions: 'Variable each year (typically ~108–120 questions across both papers)',
      attemptQuestions: 'All questions compulsory in Paper 1 & Paper 2',
      totalMarks: 'Dynamic (usually ~360 marks total across both papers)',
      duration: 'Paper 1 (9:00 AM - 12:00 PM) + Paper 2 (2:30 PM - 5:30 PM)',
      markingScheme: 'Comprehensive marking with Single Correct (+3/-1), One or More than One Correct with Partial Marking (+4/+3/+2/+1/-2), Numerical Integer, Matrix Match & Paragraph Comprehension.',
      sections: [
        {
          subject: 'Paper 1 (Physics, Chemistry, Maths)',
          mcqs: 'Multi-correct, Numerical, Match List',
          numerical: 'Integer & Decimal type',
          totalMarks: 'Subject to annual pattern (~180 Marks)',
          highlight: 'High analytical depth, multi-step derivation & spatial reasoning',
        },
        {
          subject: 'Paper 2 (Physics, Chemistry, Maths)',
          mcqs: 'Comprehension passages, Multiple correct',
          numerical: 'Grid-based numerical answers',
          totalMarks: 'Subject to annual pattern (~180 Marks)',
          highlight: 'Endurance, precision calculation & complex reasoning under time pressure',
        },
      ],
    },
    syllabusHighlights: [
      {
        subject: 'Advanced Physics',
        topics: [
          'Rigid Body Dynamics, Angular Momentum & Moment of Inertia',
          'Wave Optics, Polarization, Doppler Effect & Sound Waves',
          'Electromagnetic Induction, Alternating Current & Maxwell Equations',
          'Thermodynamics Cycles, Entropy & Real Gases',
          'Atomic, Nuclear Physics, Photoelectric Effect & Quantum Physics',
        ],
      },
      {
        subject: 'Advanced Chemistry',
        topics: [
          'Physical: Chemical & Ionic Equilibrium, Electrochemistry, Chemical Thermodynamics',
          'Organic: Reaction Mechanisms (SN1, SN2, E1, E2), Named Reactions, Stereochemistry, Carbohydrates',
          'Inorganic: Coordination Compounds & Crystal Field Theory, Metallurgy, p-Block & Qualitative Analysis',
        ],
      },
      {
        subject: 'Advanced Mathematics',
        topics: [
          'Calculus: Application of Derivatives, Maxima-Minima, Area under Curves, Differential Equations',
          'Complex Numbers: Geometry of Complex Numbers, De Moivre’s Theorem, Roots of Unity',
          'Vectors & 3D Geometry: Plane Equations, Line Equations, Skew Lines, Vector Products',
          'Combinatorics, Probability Distributions & Binomial Theorem',
        ],
      },
    ],
    vishwvedFeatures: [
      {
        title: 'Masterclass with IITian Mentors',
        desc: 'Advanced problem deconstruction by top faculty with decades of IIT JEE coaching track record.',
        icon: '👨‍🏫',
      },
      {
        title: 'Multi-Concept Question Bank',
        desc: 'Challenging questions interlinking 2–3 chapters (e.g. Calculus applied to Thermodynamics and Electromagnetism).',
        icon: '🧩',
      },
      {
        title: 'Partial Marking Optimization',
        desc: 'Specialized test-taking strategies to maximize partial marks and eliminate catastrophic negative deductions in multiple-choice questions.',
        icon: '🎯',
      },
      {
        title: 'Full-Day 6-Hour Simulation Tests',
        desc: 'Replicating the intense Paper 1 + Paper 2 exam day schedule to build physical endurance and mental stamina.',
        icon: '⏱️',
      },
      {
        title: 'Olympiad & Irodov / Krotov Workshops',
        desc: 'Deep-dive problem solving using classical reference books for unmatched analytical supremacy.',
        icon: '🏆',
      },
      {
        title: 'Personalized Rank Improvement Mentoring',
        desc: 'Weekly 1-on-1 performance review with faculty to target specific chapter weaknesses and sharpen precision.',
        icon: '📊',
      },
    ],
    batches: [
      {
        name: 'IIT Pinnacle 2-Year Program',
        target: 'Class 10 moving to Class 11 Aspirants',
        duration: '2 Years (Comprehensive Foundation to IIT Advanced)',
        schedule: '6 Days/week classroom + Advanced Weekend Tests',
        features: ['Complete syllabus mastery from basics to Olympiad/IIT level', 'Personal mentor assigned for 2 years', '50+ IIT pattern full simulations'],
      },
      {
        name: 'IIT Achievers Repeater Batch',
        target: 'Class 12 Passed / Dedicated Droppers',
        duration: '1 Year (Intensive Rigorous Problem Solving)',
        schedule: 'Intensive daily lectures + Daily Problem Solving Sessions',
        features: ['Focus on multi-concept advanced questions', 'Exclusive test series with All-India ranking', 'Individual doubt clearing & strategy sessions'],
      },
      {
        name: 'Rank Booster Advanced Sprint',
        target: 'JEE Main Qualified Students (Post Jan/April Main)',
        duration: '6 to 8 Weeks (Between JEE Main & JEE Advanced)',
        schedule: 'Daily high-level question discussions & Full-length Paper 1 & 2 simulations',
        features: ['10 full 6-hour simulation tests', 'Focus on multiple-correct and matrix match mastery', 'Error reduction workshops'],
      },
    ],
    faqs: [
      {
        q: 'Who is eligible to write JEE Advanced?',
        a: 'Only candidates who clear the cutoff percentile in JEE (Main) and rank among the top 2,50,000 candidates across all categories are eligible to write JEE Advanced.',
      },
      {
        q: 'Why is JEE Advanced considered harder than JEE Main?',
        a: 'JEE Main tests speed, formula recall, and fundamental conceptual coverage. JEE Advanced tests deep analytical derivation, multi-concept synthesis across different chapters, and variable question formats with heavy negative marking.',
      },
      {
        q: 'How does VishwaVed train students for multiple-correct questions with partial marking?',
        a: 'Our students undergo dedicated workshops on option verification, counter-example elimination, and mathematical proof checks to systematically capture all correct choices without incurring negative marks.',
      },
    ],
  },

  'neet': {
    slug: 'neet',
    title: 'NEET (UG) Medical Entrance Coaching',
    shortTitle: 'NEET',
    tag: 'Medical Entrance',
    badge: 'National Level (NTA)',
    icon: '🩺',
    heroTagline: '100% NCERT Mastery, High-Speed Precision & Your Gateway to Top Medical Colleges',
    description: 'The National Eligibility cum Entrance Test (NEET UG) is the single all-India entrance examination conducted by NTA for admission into undergraduate medical courses including MBBS, BDS, BAMS, BHMS, and other allied healthcare programs in premier institutions like AIIMS, JIPMER, and top Government Medical Colleges (GMCs).',
    inquiryCourseName: 'NEET (Medical)',
    quickStats: [
      { label: 'Conducting Body', val: 'NTA (National Testing Agency)', icon: '🏛️' },
      { label: 'Exam Mode', val: 'Pen & Paper (OMR-based offline)', icon: '📝' },
      { label: 'Total Marks', val: '720 Marks (180 Questions)', icon: '🎯' },
      { label: 'Duration', val: '3 Hours 20 Minutes (200 Mins)', icon: '⏱️' },
      { label: 'Question Count', val: '200 Questions (Attempt 180)', icon: '❓' },
      { label: 'Target Institutes', val: 'AIIMS, JIPMER, Central & State GMCs', icon: '🏥' },
    ],
    eligibility: {
      qualification: 'Passed Class 12 or equivalent with Physics, Chemistry, Biology/Biotechnology, and English.',
      minimumMarks: 'Minimum 50% aggregate in PCB in Class 12 for General category (40% for SC/ST/OBC).',
      ageLimit: 'Must be at least 17 years old by 31st December of the year of admission. No upper age limit.',
      attempts: 'No restriction on the number of attempts as long as age eligibility is met.',
      nationality: 'Indian Nationals, NRIs, OCIs, PIOs, and Foreign Nationals are eligible.',
    },
    examPattern: {
      totalQuestions: 200,
      attemptQuestions: 180,
      totalMarks: 720,
      duration: '3 Hours 20 Minutes (200 Minutes)',
      markingScheme: '+4 marks for each correct response, -1 mark for each incorrect response, 0 for unattempted questions.',
      sections: [
        {
          subject: 'Biology (Botany + Zoology)',
          mcqs: '90 Questions to attempt (100 total)',
          numerical: 'Diagram & assertion-reasoning',
          totalMarks: 360,
          highlight: '50% of the entire exam — 100% NCERT line-by-line coverage required',
        },
        {
          subject: 'Physics',
          mcqs: '45 Questions to attempt (50 total)',
          numerical: 'Formula applications & calculations',
          totalMarks: 180,
          highlight: 'Core rank-decider subject: rapid calculation & conceptual clarity',
        },
        {
          subject: 'Chemistry',
          mcqs: '45 Questions to attempt (50 total)',
          numerical: 'Organic, Inorganic & Physical',
          totalMarks: 180,
          highlight: 'High scoring: NCERT inorganic tables & organic reaction roadmaps',
        },
      ],
    },
    syllabusHighlights: [
      {
        subject: 'Biology (Botany & Zoology)',
        topics: [
          'Human Physiology: Digestion, Breathing, Circulation, Excretion, Neural & Chemical Control',
          'Genetics & Evolution: Mendelian Principles, Molecular Basis of Inheritance',
          'Plant Physiology: Photosynthesis, Respiration, Plant Growth & Regulators',
          'Cell Structure, Cell Division & Biomolecules',
          'Ecology, Environment, Biodiversity & Conservation',
          'Reproduction in Organisms, Human Reproduction & Reproductive Health',
        ],
      },
      {
        subject: 'Physics for Medical',
        topics: [
          'Mechanics: Laws of Motion, Work Energy Power, Gravitation, Fluid Mechanics',
          'Thermodynamics, Heat Transfer & Kinetic Theory of Gases',
          'Electrostatics, Current Electricity, Magnetism & EMI',
          'Ray & Wave Optics, Semiconductor Electronics, Modern Physics',
        ],
      },
      {
        subject: 'Chemistry for Medical',
        topics: [
          'Organic: Reaction Mechanisms, Biomolecules, Polymers, Carbonyl Compounds',
          'Inorganic: NCERT Periodic Trends, Coordination Compounds, Metallurgy, Chemical Bonding',
          'Physical: Solutions, Chemical Equilibrium, Electrochemistry, Atomic Structure',
        ],
      },
    ],
    vishwvedFeatures: [
      {
        title: '100% NCERT Line-by-Line Mastery',
        desc: 'Every diagram, summary table, footnote, and exemplar question from NCERT Biology & Chemistry decoded and tested.',
        icon: '🔬',
      },
      {
        title: 'Weekly OMR Test Simulations',
        desc: 'Regular offline OMR tests to build bubble-filling speed and eliminate OMR bubbling errors under time constraints.',
        icon: '📝',
      },
      {
        title: 'Physics Simplified for Medical Aspirants',
        desc: 'Special math foundation modules (Trigonometry, Calculus basics) to help biology students conquer physics numericals fearlessly.',
        icon: '⚡',
      },
      {
        title: 'Assertion-Reason & Statement Drills',
        desc: 'Extensive practice of NTA’s latest pattern question types: Match the columns, Assertion-Reason, and Statement-based questions.',
        icon: '🎯',
      },
      {
        title: 'Biology Flashcards & Mnemonics',
        desc: 'Memory retention aids and quick revision flashcards for botanical classifications, hormones, and biological cycles.',
        icon: '🧠',
      },
      {
        title: 'Personalized Speed & Score Tracking',
        desc: 'Granular analytics identifying questions where you lost marks to negative marking or excessive time consumption.',
        icon: '📊',
      },
    ],
    batches: [
      {
        name: 'NEET 2-Year Integrated Foundation',
        target: 'Students entering Class 11',
        duration: '2 Years (Class 11 + 12 + Complete NEET UG)',
        schedule: 'Daily Classroom Sessions + Weekly OMR Tests',
        features: ['Simultaneous 12th Board + NEET prep', 'Over 60+ full syllabus mock tests', 'Dedicated biology & chemistry memory workshops'],
      },
      {
        name: 'NEET Dropper / Repeater Batch',
        target: 'Class 12 Passed Students targeting 650+ Score',
        duration: '1 Year (Intensive Full Day Prep)',
        schedule: '6 Days/week full-day curriculum with daily practice tests',
        features: ['Intensive physics numerical solving modules', '10,000+ question bank practice', 'Personalized mentor for score boosting'],
      },
      {
        name: 'NEET Score Booster & Test Series',
        target: 'Class 12 Appearing / Droppers',
        duration: '4 Months (Intensive Mock Phase)',
        schedule: 'Bi-weekly Full Length 720-Mark OMR Mock Exams',
        features: ['All India benchmark OMR simulations', 'Detailed paper analysis by expert doctor faculty', 'Quick revision summary sheets'],
      },
    ],
    faqs: [
      {
        q: 'Is NCERT sufficient for cracking NEET with a 650+ score?',
        a: 'For Biology and Inorganic Chemistry, NCERT is 95%+ sufficient when studied line-by-line. For Physics and Physical Chemistry, in addition to NCERT concepts, high-speed problem-solving practice and past 20 years PYQs provided at VishwaVed are essential for scoring 650+.',
      },
      {
        q: 'Is there an upper age limit for NEET UG?',
        a: 'No, the National Medical Commission (NMC) has removed the upper age limit for NEET UG. Candidates must only fulfill the minimum age requirement of 17 years by December 31 of the admission year.',
      },
      {
        q: 'How does VishwaVed help students who struggle with Physics in NEET?',
        a: 'We conduct a specialized "Basic Mathematics & Vectors for Physics" bridge course, followed by categorized formula sheets, shortcut techniques, and daily 30-question numerical drills so students score 140+ in Physics with ease.',
      },
    ],
  },

  'mht-cet': {
    slug: 'mht-cet',
    title: 'MHT-CET (Engineering & Pharmacy) Coaching',
    shortTitle: 'MHTCET',
    tag: 'State CET',
    badge: 'Maharashtra State CET Cell',
    icon: '⚡',
    heroTagline: 'Target 99+ Percentile in Maharashtra State CET for Top Engineering & Pharmacy Colleges',
    description: 'The Maharashtra Common Entrance Test (MHT-CET) is conducted annually by the State Common Entrance Test Cell, Maharashtra. It is the premier gateway for admissions into top state engineering and pharmacy institutions including COEP Technological University, VJTI Mumbai, SPIT, PICT Pune, Walchand Sangli, and ICT Mumbai.',
    inquiryCourseName: 'MHT-CET (Engineering / Pharmacy)',
    quickStats: [
      { label: 'Conducting Body', val: 'State CET Cell, Maharashtra', icon: '🏛️' },
      { label: 'Exam Mode', val: 'Computer Based Test (CBT)', icon: '💻' },
      { label: 'Total Marks', val: '200 Marks (PCM or PCB group)', icon: '🎯' },
      { label: 'Duration', val: '180 Minutes (90m Math/Bio + 90m Phy/Chem)', icon: '⏱️' },
      { label: 'Negative Marking', val: 'NO Negative Marking', icon: '✅' },
      { label: 'Target Institutes', val: 'COEP, VJTI, SPIT, PICT, ICT, VIT Pune', icon: '🎓' },
    ],
    eligibility: {
      qualification: 'Passed or appearing in Class 12 (HSC) or equivalent examination.',
      minimumMarks: 'Minimum 45% aggregate marks in PCM/PCB for General Category (40% for Reserved / PwD candidates of Maharashtra State).',
      domicile: 'Maharashtra State Candidature type candidates get 85% quota in state institutes. All India candidates can apply through JEE Main scores or MHT-CET.',
      streams: 'PCM Group for Engineering & Technology (B.E./B.Tech) | PCB Group for Pharmacy (B.Pharm / Pharm.D) & Agriculture.',
    },
    examPattern: {
      totalQuestions: 150,
      attemptQuestions: 150,
      totalMarks: 200,
      duration: '180 Minutes (90 Minutes per session)',
      markingScheme: 'NO NEGATIVE MARKING! Mathematics: +2 marks per correct answer. Physics, Chemistry, Biology: +1 mark per correct answer.',
      sections: [
        {
          subject: 'Paper 1: Mathematics (PCM)',
          mcqs: '50 Questions (40 from Class 12, 10 from Class 11)',
          numerical: 'Multiple Choice (4 Options)',
          totalMarks: 100,
          highlight: 'Each question carries 2 marks. 90-minute dedicated window.',
        },
        {
          subject: 'Paper 2: Physics & Chemistry (PCM/PCB)',
          mcqs: '100 Questions (50 Physics + 50 Chemistry)',
          numerical: 'Multiple Choice (4 Options)',
          totalMarks: 100,
          highlight: 'Each question carries 1 mark. 90-minute dedicated window.',
        },
        {
          subject: 'Paper 3: Biology (PCB Group)',
          mcqs: '100 Questions (80 from Class 12, 20 from Class 11)',
          numerical: 'Multiple Choice (4 Options)',
          totalMarks: 100,
          highlight: '1 mark per question for Pharmacy & Agriculture aspirants.',
        },
      ],
    },
    syllabusHighlights: [
      {
        subject: 'Syllabus Distribution',
        topics: [
          '80% Weightage to Maharashtra State Board Class 12th Syllabus',
          '20% Weightage to specific selected chapters of Class 11th State Board Syllabus',
          'High focus on State Board Textbook definitions, formulas, and solved exercises',
        ],
      },
      {
        subject: 'Mathematics High-Weightage Chapters',
        topics: [
          'Calculus: Integration, Definite Integrals, Differential Equations, Application of Derivatives',
          'Vectors, 3D Geometry & Line-Plane relations',
          'Matrices, Trigonometric Functions, Pair of Straight Lines, Probability & Binomial Distribution',
        ],
      },
      {
        subject: 'Physics & Chemistry High-Weightage',
        topics: [
          'Physics: Rotational Dynamics, Mechanical Properties of Fluids, Oscillations, Wave Optics, Current Electricity, Semiconductor Devices',
          'Chemistry: Chemical Thermodynamics, Electrochemistry, Coordination Compounds, Aldehydes Ketones & Carboxylic Acids, Halogen Derivatives',
        ],
      },
    ],
    vishwvedFeatures: [
      {
        title: 'State Board Textbook Synchronization',
        desc: 'Complete line-by-line coverage of Maharashtra State Board (HSC) textbooks to maximize both 12th board marks and CET scores.',
        icon: '📚',
      },
      {
        title: 'Shortcut Speed Tricks for Math',
        desc: 'Special Vedic and algebraic shortcut methods to solve 50 mathematics questions in 90 minutes without errors.',
        icon: '⚡',
      },
      {
        title: 'Maharashtra State CBT Platform',
        desc: 'Practice on our real CET-interface simulation test series with state percentile estimation based on past years cutoff data.',
        icon: '🖥️',
      },
      {
        title: 'Zero Negative Marking Strategy',
        desc: 'Tactical guessing, option elimination, and smart probability optimization to maximize every single mark.',
        icon: '🎯',
      },
      {
        title: '10+ Years MHT-CET PYQs Bank',
        desc: 'Chapter-wise compilation of all previous CET shifts questions with detailed step-by-step solutions.',
        icon: '📖',
      },
      {
        title: 'COEP / VJTI Target Mentorship',
        desc: 'Personal guidance from top rankers on branch selection, CAP rounds, and high-percentile study roadmaps.',
        icon: '🏆',
      },
    ],
    batches: [
      {
        name: 'MHT-CET + HSC Board 2-Year Program',
        target: 'Students entering Class 11',
        duration: '2 Years (HSC Board + MHT-CET)',
        schedule: 'Daily Classroom lectures + Weekly CET Chapter Tests',
        features: ['Full HSC Board theory + CET MCQ mastery', 'Weekly online CBTs', 'Formula cheat sheets and study notes'],
      },
      {
        name: 'MHT-CET Target 1-Year Batch',
        target: 'Class 12 Students & Droppers',
        duration: '1 Year (Class 12 + Class 11 CET Topics)',
        schedule: '5 Days/week lectures + Weekend Full MHT-CET Mock Tests',
        features: ['Comprehensive Class 11 + 12 CET syllabus coverage', '30 Full-length mock tests', 'Dedicated doubt solving sessions'],
      },
      {
        name: 'MHT-CET 60-Day Fast Track Crash Course',
        target: 'Post-Board Examination Aspirants',
        duration: '60 Days (Sprint from March to Exam Date)',
        schedule: 'Daily intensive lectures + Daily Full Syllabus Mock CBTs',
        features: ['Rapid revision of all high-weightage topics', '20+ Full CBT Mock Tests with state rank analysis', 'Shortcut tips and speed drills'],
      },
    ],
    faqs: [
      {
        q: 'Is there any negative marking in MHT-CET?',
        a: 'No! MHT-CET has NO negative marking. Therefore, students should attempt all 150 questions in the exam to maximize their total score.',
      },
      {
        q: 'What is the syllabus split between Class 11 and Class 12?',
        a: 'The MHT-CET examination gives 80% weightage to the Maharashtra State Board Class 12 syllabus and 20% weightage to selected syllabus chapters from Class 11.',
      },
      {
        q: 'What percentile is required for computer engineering in COEP / VJTI / PICT?',
        a: 'Generally, securing a 99.2+ percentile is required for Computer Science and IT branches in top colleges like COEP, VJTI, and PICT. At VishwaVed, our focused pedagogy is tailored to get students across the 99+ percentile threshold.',
      },
    ],
  },

  'foundation': {
    slug: 'foundation',
    title: 'Pre-Foundation & Olympiads (Class 8th – 10th)',
    shortTitle: 'FOUNDATION',
    tag: 'School & Olympiad Prep',
    badge: 'Class 8th, 9th, 10th',
    icon: '🌱',
    heroTagline: 'Build Rock-Solid Science & Math Fundamentals, Logical Thinking & Olympiad Success',
    description: 'The VishwaVed Foundation Program is an early-grooming academic initiative designed for students of Classes 8, 9, and 10. It bridges the gap between school curriculum and competitive examinations, cultivating strong conceptual clarity, analytical problem-solving, and mental ability to excel in School Board Exams, Olympiads (NSO, IMO, PRMO), NTSE, Homi Bhabha, and build a head start for future JEE/NEET success.',
    inquiryCourseName: 'FOUNDATION (Class 8th – 10th)',
    quickStats: [
      { label: 'Target Classes', val: 'Class 8th, 9th & 10th Students', icon: '🏫' },
      { label: 'Boards Covered', val: 'State Board, CBSE & ICSE', icon: '📚' },
      { label: 'Focus Areas', val: 'Science, Mathematics & Mental Ability (MAT)', icon: '🔬' },
      { label: 'Competitions', val: 'NSO, IMO, IOQM/PRMO, Homi Bhabha, NTSE', icon: '🏆' },
      { label: 'Class Mode', val: 'Interactive Classroom + Digital Learning', icon: '💡' },
      { label: 'Outcome', val: '95%+ in Boards & Seamless JEE/NEET Transition', icon: '🎯' },
    ],
    eligibility: {
      qualification: 'Students currently studying in or moving to Class 8, Class 9, or Class 10.',
      boards: 'Open to students from Maharashtra State Board, CBSE, and ICSE curriculum.',
      selection: 'Direct admission / VishwaVed Foundation Diagnostic & Scholarship Assessment.',
    },
    examPattern: {
      totalQuestions: 'Continuous Comprehensive Assessment',
      attemptQuestions: 'Subjective + Objective Multi-format',
      totalMarks: 'Chapter-wise (50 Marks) & Term Exams (100 Marks)',
      duration: 'Regular 1 Hour & 2 Hour format tests',
      markingScheme: 'Subjective board writing evaluation + Objective speed testing for competitive mindset.',
      sections: [
        {
          subject: 'Physics & Chemistry',
          mcqs: 'Conceptual & Numerical Questions',
          numerical: 'Experiments & Applications',
          totalMarks: 'Core Concept Mastery',
          highlight: 'Hands-on scientific inquiry, visualization and real-world application.',
        },
        {
          subject: 'Mathematics',
          mcqs: 'Step-by-step proofs & Speed calculation',
          numerical: 'Algebra, Geometry & Arithmetic',
          totalMarks: 'Logical Foundation',
          highlight: 'Elimination of math anxiety, mental math tricks & Olympiad reasoning.',
        },
        {
          subject: 'Biology & Mental Ability (MAT)',
          mcqs: 'Diagrams, Patterns, Puzzles & Logic',
          numerical: 'Verbal & Non-Verbal Reasoning',
          totalMarks: 'Aptitude & Memory',
          highlight: 'Enhancing cognitive thinking, IQ, spatial reasoning, and pattern recognition.',
        },
      ],
    },
    syllabusHighlights: [
      {
        subject: 'Class 8th Foundation',
        topics: [
          'Physics: Force & Pressure, Friction, Sound, Light, Chemical Effects of Electric Current',
          'Chemistry: Synthetic Fibres, Metals & Non-Metals, Combustion & Flame, Pollution',
          'Maths: Rational Numbers, Linear Equations, Understanding Quadrilaterals, Mensuration, Exponents',
          'Mental Ability: Number Series, Coding-Decoding, Blood Relations, Direction Sense',
        ],
      },
      {
        subject: 'Class 9th Foundation (Pre-JEE/NEET Bridge)',
        topics: [
          'Physics: Motion, Laws of Motion, Gravitation, Work & Energy, Sound (Bridge to 11th Mechanics)',
          'Chemistry: Matter in Our Surroundings, Atoms & Molecules, Structure of Atom',
          'Maths: Number Systems, Polynomials, Coordinate Geometry, Triangles, Quadrilaterals, Surface Areas',
          'Biology: Fundamental Unit of Life (Cell), Tissues, Diversity in Living Organisms',
        ],
      },
      {
        subject: 'Class 10th Foundation (Board + Competitive)',
        topics: [
          'Physics: Light (Reflection & Refraction), Human Eye, Electricity, Magnetic Effects of Electric Current',
          'Chemistry: Chemical Reactions & Equations, Acids Bases & Salts, Metals & Non-Metals, Carbon Compounds',
          'Maths: Real Numbers, Quadratic Equations, Arithmetic Progressions, Trigonometry, Circles, Statistics',
          'Biology: Life Processes, Control & Coordination, Heredity & Evolution',
        ],
      },
    ],
    vishwvedFeatures: [
      {
        title: 'Stress-Free Conceptual Learning',
        desc: 'Interactive lectures that encourage questioning and build deep curiosity without overwhelming young minds.',
        icon: '🌱',
      },
      {
        title: 'Mental Ability & IQ Development',
        desc: 'Dedicated weekly sessions on logical reasoning, pattern analysis, and puzzle solving.',
        icon: '🧠',
      },
      {
        title: 'Olympiad & Scholarship Training',
        desc: 'Special grooming for National Science Olympiad (NSO), International Math Olympiad (IMO), and Homi Bhabha Balvaidyanik.',
        icon: '🏆',
      },
      {
        title: '95%+ Board Exam Blueprint',
        desc: 'Thorough answer-writing practice, step marking evaluation, and model answer keys for 10th board excellence.',
        icon: '📝',
      },
      {
        title: 'Early Advantage for JEE & NEET',
        desc: 'Lays the essential base in kinematics, atomic structure, and algebra that makes Class 11 feel effortless.',
        icon: '🚀',
      },
      {
        title: 'Parent-Teacher Collaboration',
        desc: 'Monthly performance reviews, attendance tracking, and individual counselling for all-round growth.',
        icon: '👨‍👩‍👧',
      },
    ],
    batches: [
      {
        name: 'Class 8th Junior Foundation',
        target: 'Class 8 Students',
        duration: '1 Academic Year (June to February)',
        schedule: '4 Days a week (Evening After School)',
        features: ['School syllabus + Science & Math Olympiad modules', 'Fun experiments & logical puzzles', 'Regular chapter-end tests'],
      },
      {
        name: 'Class 9th Bridge Foundation',
        target: 'Class 9 Students',
        duration: '1 Academic Year',
        schedule: '4–5 Days a week (Evening Batches)',
        features: ['Strong focus on core Physics, Chemistry, Math fundamentals', 'Pre-JEE & Pre-NEET basic concept linkage', 'Olympiad preparation'],
      },
      {
        name: 'Class 10th Board Mastery + Pre-Competitive',
        target: 'Class 10 Students',
        duration: '1 Academic Year (Intensive Board + Career Prep)',
        schedule: '5 Days a week + Weekend Board Prelims',
        features: ['Complete 10th Board syllabus completion by November', 'Prelim test series with detailed paper checking', 'Career counseling for stream selection (Engineering / Medical)'],
      },
    ],
    faqs: [
      {
        q: 'Why should my child join a foundation course in Class 8, 9, or 10?',
        a: 'Class 11 Science is significantly more advanced than Class 10 school syllabus. A foundation course bridges this gap early by developing analytical thinking, problem-solving speed, and removing fear of math and science, making future JEE/NEET prep smooth and stress-free.',
      },
      {
        q: 'Will the foundation course interfere with regular school studies?',
        a: 'Not at all. The curriculum is synchronized with school exams so that students excel in both their school exams (scoring 90-95%+) and competitive Olympiads simultaneously.',
      },
      {
        q: 'Which Olympiads does VishwaVed prepare foundation students for?',
        a: 'We prepare students for NSO (Science Olympiad), IMO (Math Olympiad), PRMO/IOQM (Math Olympiad), Homi Bhabha Balvaidyanik Competition, and State Talent Search Exams.',
      },
    ],
  },
}

export const ALL_COURSES = Object.values(COURSES_DATA)
