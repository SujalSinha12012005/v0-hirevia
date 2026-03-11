# HireVia - Placement Preparation Platform

A comprehensive Next.js application for students to prepare for campus placements with AI-powered resume analysis, job description matching, and placement readiness tracking.

## Features

### 🎯 Resume Analysis
- Upload PDF or DOCX resumes (up to 5MB)
- AI-powered scoring based on:
  - Content Quality
  - Formatting
  - Keyword Optimization
  - Completeness
- Get personalized suggestions for improvement
- Earn credits for each analysis
- Best-fit role identification

### 📊 JD Match
- Paste job descriptions to check match percentage
- See matched and missing keywords
- Get improvement tips based on your resume
- Personalized matching based on your analyzed resume

### 📈 Placement Readiness
- Track your overall placement readiness
- View score breakdowns
- Monitor progress over time

### 💳 Credit System
- Earn credits by analyzing resumes
- Use credits for premium features
- Track credit balance

## Dashboard Features

The main dashboard displays:
- **Resume Score** - Your latest resume analysis score
- **Credit Balance** - Available credits
- **Readiness Index** - Overall placement readiness
- **Campus Rank** - Your position
- **Current Streak** - Daily activity streak
- **Best Fit Role** - Your recommended role based on resume analysis

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **PDF Processing**: pdf-parse
- **DOCX Processing**: mammoth

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Demo Credentials

```
Student: student@hirevia.com / student123
Admin: admin@hirevia.com / admin123
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── analyze-resume/    # Resume analysis API
│   │   └── generate-roadmap/  # Roadmap generation API
│   ├── dashboard/
│   │   ├── page.tsx           # Main dashboard
│   │   ├── resume/            # Resume analysis page
│   │   ├── jd-match/          # Job description matching
│   │   ├── readiness/         # Placement readiness
│   │   ├── credits/           # Credit management
│   │   ├── quizzes/           # Practice quizzes
│   │   ├── interview/         # Interview prep
│   │   ├── roadmap/           # Learning roadmap
│   │   └── ...
│   └── login/                 # Authentication
├── components/               # Reusable UI components
├── context/                   # React context providers
├── hooks/                     # Custom React hooks
├── lib/                       # Utility functions
└── types/                     # TypeScript type definitions
```

## Data Flow

1. **Resume Analysis** → Data saved to AuthContext (localStorage)
2. **Dashboard** → Reads resume score, credits from AuthContext
3. **JD Match** → Uses analyzed resume data for personalized matching
4. **Readiness** → Calculates overall readiness from all metrics

## API Endpoints

### POST /api/analyze-resume
Analyzes uploaded resume and returns:
- Overall score (0-100)
- Best-fit role
- Missing skills
- Improvement suggestions
- Score breakdown
- Credits earned

### POST /api/generate-roadmap
Generates learning roadmap based on target role and current skills.

## Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## Contributing

This project was created using [v0](https://v0.app). To continue development, visit the [v0 project](https://v0.app/chat/projects/prj_znXLZKkzHLe0IQwSO1GL2YhHVnpx).

## License

MIT

