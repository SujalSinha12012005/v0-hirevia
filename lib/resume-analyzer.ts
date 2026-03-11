export type AnalysisResult = {
  score: number
  bestFitRole: string
  missingSkills: string[]
  suggestions: string[]
  creditsEarned: number
  breakdown: {
    contentQuality: number
    formatting: number
    keywordOptimization: number
    completeness: number
  }
}

const SECTION_HEADERS = [
  "experience", "work experience", "employment", "professional experience",
  "education", "academic", "qualifications",
  "skills", "technical skills", "competencies", "expertise",
  "summary", "objective", "profile", "about me",
  "projects", "project experience",
  "certifications", "certificates",
  "achievements", "awards",
]

const TECH_KEYWORDS = [
  "javascript", "typescript", "react", "node", "node.js", "python", "java",
  "sql", "mongodb", "postgresql", "html", "css", "tailwind", "git", "docker",
  "aws", "rest", "api", "mern", "fullstack", "full-stack", "frontend", "backend",
  "redux", "express", "next", "angular", "vue", "jest", "testing", "ci/cd",
]

const ACTION_VERBS = [
  "developed", "built", "created", "implemented", "designed", "led", "managed",
  "improved", "optimized", "reduced", "increased", "achieved", "delivered",
]

export function analyzeResumeText(text: string): AnalysisResult {
  const lower = text.toLowerCase()
  const words = text.split(/\s+/).filter(Boolean)
  const wordCount = words.length

  // Detect sections
  const sectionsFound: string[] = []
  for (const section of SECTION_HEADERS) {
    if (lower.includes(section)) sectionsFound.push(section)
  }

  // Count tech keywords
  let techCount = 0
  for (const kw of TECH_KEYWORDS) {
    if (lower.includes(kw)) techCount++
  }

  // Count action verbs
  let actionCount = 0
  for (const verb of ACTION_VERBS) {
    if (lower.includes(verb)) actionCount++
  }

  // Content Quality: word count + action verbs
  const wordScore = Math.min(100, Math.round((wordCount / 500) * 100))
  const actionScore = Math.min(100, actionCount * 15)
  const contentQuality = Math.round((wordScore * 0.5 + actionScore * 0.5))

  // Formatting: sections, bullet points, structure
  const sectionScore = Math.min(100, sectionsFound.length * 20)
  const hasBullets = /[•·\-\*]\s|\d+\.\s/.test(text)
  const formatting = Math.round(sectionScore * 0.7 + (hasBullets ? 30 : 0))

  // Keyword Optimization
  const keywordScore = Math.min(100, techCount * 8)
  const keywordOptimization = Math.min(100, Math.round(keywordScore + (actionCount * 5)))

  // Completeness: essential sections
  const hasExperience = /experience|employment|work/.test(lower)
  const hasEducation = /education|degree|university|college/.test(lower)
  const hasSkills = /skills|technical|technologies/.test(lower)
  const hasContact = /@|email|phone|\d{10}/.test(text)
  const hasSummary = /summary|objective|profile|about/.test(lower)
  const hasProjects = /project|github|portfolio/.test(lower)

  let completeness = 0
  if (hasExperience) completeness += 25
  if (hasEducation) completeness += 25
  if (hasSkills) completeness += 20
  if (hasContact) completeness += 15
  if (hasSummary) completeness += 10
  if (hasProjects) completeness += 5

  // Overall score (weighted average)
  const score = Math.round(
    contentQuality * 0.25 +
    formatting * 0.25 +
    keywordOptimization * 0.3 +
    completeness * 0.2
  )

  // Best fit role (simple heuristic)
  const bestFitRole = inferRole(lower, techCount, techKeywordsFound(lower))

  // Missing skills
  const missingSkills = suggestMissingSkills(lower)

  // Suggestions
  const suggestions = generateSuggestions({
    wordCount,
    hasSummary,
    hasBullets,
    hasProjects,
    techCount,
    sectionsFound,
    completeness,
  })

  // Credits (10 for analyzing)
  const creditsEarned = 10

  return {
    score: Math.min(100, Math.max(0, score)),
    bestFitRole,
    missingSkills,
    suggestions,
    creditsEarned,
    breakdown: {
      contentQuality: Math.min(100, contentQuality),
      formatting: Math.min(100, formatting),
      keywordOptimization: Math.min(100, keywordOptimization),
      completeness: Math.min(100, completeness),
    },
  }
}

function techKeywordsFound(text: string): string[] {
  return TECH_KEYWORDS.filter((kw) => text.includes(kw))
}

function inferRole(text: string, techCount: number, found: string[]): string {
  if (found.includes("react") && (found.includes("node") || found.includes("express"))) {
    return "Full Stack / MERN Developer"
  }
  if (found.includes("react") || found.includes("angular") || found.includes("vue")) {
    return "Frontend Developer"
  }
  if (found.includes("python") && found.includes("machine learning")) {
    return "ML Engineer"
  }
  if (found.includes("java") || found.includes("spring")) {
    return "Java Developer"
  }
  if (techCount >= 5) return "Software Developer"
  if (techCount >= 2) return "Developer"
  return "General Role"
}

function suggestMissingSkills(text: string): string[] {
  const suggestions: string[] = []
  if (!text.includes("typescript") && text.includes("javascript")) {
    suggestions.push("TypeScript")
  }
  if (!text.includes("testing") && !text.includes("jest") && !text.includes("unit test")) {
    suggestions.push("Testing (Jest/Vitest)")
  }
  if (!text.includes("git") && !text.includes("version control")) {
    suggestions.push("Git / Version Control")
  }
  if (!text.includes("api") && !text.includes("rest")) {
    suggestions.push("REST APIs")
  }
  if (!text.includes("docker") && !text.includes("ci/cd")) {
    suggestions.push("Docker / CI-CD basics")
  }
  if (suggestions.length === 0) {
    suggestions.push("System Design basics", "Leadership/mentorship experience")
  }
  return suggestions.slice(0, 5)
}

function generateSuggestions(ctx: {
  wordCount: number
  hasSummary: boolean
  hasBullets: boolean
  hasProjects: boolean
  techCount: number
  sectionsFound: string[]
  completeness: number
}): string[] {
  const out: string[] = []

  if (!ctx.hasSummary) {
    out.push("Add a professional summary at the top of your resume")
  }
  if (ctx.wordCount < 300) {
    out.push("Expand your resume with more details on projects and achievements")
  }
  if (!ctx.hasBullets) {
    out.push("Use bullet points for easier scanning")
  }
  if (!ctx.hasProjects) {
    out.push("Include links to your GitHub and portfolio")
  }
  if (ctx.techCount < 3) {
    out.push("List relevant technical skills clearly with categories")
  }
  out.push("Quantify achievements where possible (e.g., improved load time by 40%)")

  return [...new Set(out)].slice(0, 5)
}
