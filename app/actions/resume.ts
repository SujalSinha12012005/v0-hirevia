'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveResumeAnalysis(data: {
  score: number
  best_fit_role: string
  missing_skills: string[]
  suggestions: string[]
  filename: string
}) {
  const supabase = await createClient()
  
  const { data: userData, error: authError } = await supabase.auth.getUser()
  if (authError || !userData?.user) {
    return { success: false, message: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('resume_analyses')
    .insert({
      user_id: userData.user.id,
      score: data.score,
      best_fit_role: data.best_fit_role,
      missing_skills: data.missing_skills,
      suggestions: data.suggestions,
      filename: data.filename
    })

  if (error) {
    console.error('Error saving resume analysis:', error)
    return { success: false, message: 'Failed to save analysis to database.' }
  }

  // Ensure the dashboard caches are revalidated so the new score shows up immediately
  revalidatePath('/dashboard')
  
  return { success: true }
}

export async function getLatestResumeAnalysis() {
  const supabase = await createClient()
  
  const { data: userData, error: authError } = await supabase.auth.getUser()
  if (authError || !userData?.user) {
    return null
  }

  const { data, error } = await supabase
    .from('resume_analyses')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    if (error.code !== 'PGRST116') { // PGRST116 is the code for 0 rows returned
      console.error('Error fetching resume analysis:', error)
    }
    return null
  }

  return data
}
