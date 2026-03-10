"use client"

import { useState } from 'react'

type Analysis = {
  score: number
  breakdown: Record<string, any>
  suggestions: string[]
  topKeywords: Array<{ keyword: string; count: number }>
}

export default function ResumeAnalyzer() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submitText(t: string) {
    setLoading(true)
    setError(null)
    setAnalysis(null)
    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: t }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Analysis failed')
      setAnalysis(data.analysis)
    } catch (err: any) {
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.type && !f.type.startsWith('text/')) {
      setError('Only plain text (.txt) uploads are supported in this quick demo. Please paste PDF text or upload .txt')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const t = String(reader.result || '')
      setText(t)
    }
    reader.readAsText(f)
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Resume Analyzer</h2>

      <div className="mb-4">
        <label className="block mb-2">Paste resume text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Or upload a plain .txt file</label>
        <input type="file" accept=".txt,text/*" onChange={onFile} />
      </div>

      <div className="flex gap-2 mb-6">
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-60"
          onClick={() => submitText(text)}
          disabled={loading || !text.trim()}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
        <button
          className="px-4 py-2 border rounded"
          onClick={() => { setText(''); setAnalysis(null); setError(null) }}
        >
          Clear
        </button>
      </div>

      {error && <div className="mb-4 text-destructive">{error}</div>}

      {analysis && (
        <div className="bg-card p-4 rounded">
          <h3 className="text-xl font-semibold">Score: {analysis.score}/100</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <h4 className="font-medium">Breakdown</h4>
              <ul className="mt-2 text-sm">
                {Object.entries(analysis.breakdown).map(([k, v]) => (
                  <li key={k} className="mb-1"><strong>{k}:</strong> {String(v)}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Top keywords</h4>
              <ul className="mt-2 text-sm">
                {analysis.topKeywords.map((t) => (
                  <li key={t.keyword}>{t.keyword} — {t.count}</li>
                ))}
              </ul>
            </div>
          </div>

          {analysis.suggestions.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium">Suggestions</h4>
              <ul className="list-disc pl-5 mt-2 text-sm">
                {analysis.suggestions.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
