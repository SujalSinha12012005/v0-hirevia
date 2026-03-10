import { NextRequest, NextResponse } from 'next/server'
import pdf from 'pdf-parse'

function analyzeResumeText(text: string) {
  const lower = text.toLowerCase()

  // Keywords that are considered valuable for scoring
  const keywords = [
    'javascript','typescript','react','node','express','next','html','css','sql','postgres','mysql','python','java','c++','c#','aws','azure','gcp','docker','kubernetes','git','graphql','rest','mongodb','redis',
    'leadership','communication','team','project','internship','research'
  ]

  // Count keyword matches
  const keywordCounts: Record<string, number> = {}
  let totalKeywordHits = 0
  for (const k of keywords) {
    const re = new RegExp('\\b' + k.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&') + '\\b', 'gi')
    const m = lower.match(re)
    const c = m ? m.length : 0
    if (c > 0) {
      keywordCounts[k] = c
      totalKeywordHits += c
    }
  }

  // Experience estimation: look for patterns like "3 years", "5+ years", "6 yrs"
  let years = 0
  const expMatch = lower.match(/(\\d{1,2})\\+?\\s*(years|yrs|year)/)
  if (expMatch) years = parseInt(expMatch[1], 10)

  // Education detection
  const hasBachelor = /\b(bachelor|bsc|ba)\b/.test(lower)
  const hasMaster = /\b(master|msc|ma|ms)\b/.test(lower)
  const hasPhd = /\b(phd|doctor)\b/.test(lower)

  // Length and formatting heuristics
  const words = text.trim().split(/\s+/).filter(Boolean).length

  // Scoring: compose sub-scores then normalize to 0-100
  // keywordScore: up to 50
  const keywordScore = Math.min(50, Math.round(Math.log1p(totalKeywordHits) / Math.log(2 + 1) * 10))

  // experienceScore: up to 20
  const experienceScore = Math.min(20, Math.round((Math.min(years, 10) / 10) * 20))

  // educationScore: up to 15
  let educationScore = 0
  if (hasPhd) educationScore = 15
  else if (hasMaster) educationScore = 12
  else if (hasBachelor) educationScore = 9

  // length/formatScore: up to 15
  let lengthScore = 0
  if (words >= 800) lengthScore = 15
  else if (words >= 400) lengthScore = 12
  else if (words >= 200) lengthScore = 9
  else lengthScore = 4

  const raw = keywordScore + experienceScore + educationScore + lengthScore
  const score = Math.max(0, Math.min(100, raw))

  // Suggestions
  const suggestions: string[] = []
  if (totalKeywordHits === 0) suggestions.push('Add relevant technical keywords (e.g. React, Node, TypeScript, AWS) where applicable.')
  if (years === 0) suggestions.push('Explicitly state years of experience (e.g. "3 years experience") to improve the experience estimate.')
  if (words < 200) suggestions.push('Your resume is short — consider adding more project details, technologies used, and measurable outcomes.')
  if (!hasBachelor && !hasMaster && !hasPhd) suggestions.push('Include education details (degree and institution) if applicable.')

  // Build breakdown
  const breakdown = {
    keywordScore,
    experienceScore,
    educationScore,
    lengthScore,
    totalKeywordHits,
    detectedYears: years,
    words,
  }

  const topKeywords = Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([k, c]) => ({ keyword: k, count: c }))

  return { score, breakdown, suggestions, topKeywords }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || ''

    let text = ''

    // Support JSON with { text } or { fileBase64 }
    if (contentType.includes('application/json')) {
      const data = await req.json()
      if (data.fileBase64) {
        // decode base64 and parse PDF
        const buf = Buffer.from(data.fileBase64, 'base64')
        try {
          const parsed = await pdf(buf as Buffer)
          text = String(parsed.text || '').trim()
        } catch (e) {
          return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 })
        }
      } else {
        text = String(data.text || '').trim()
      }
    } else {
      // fallback: try to read as json
      const data = await req.json().catch(() => ({}))
      text = String(data.text || '').trim()
    }

    if (!text) {
      return NextResponse.json({ error: 'No resume text provided' }, { status: 400 })
    }

    const analysis = analyzeResumeText(text)
    return NextResponse.json({ ok: true, analysis })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
