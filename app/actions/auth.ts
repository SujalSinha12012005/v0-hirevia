'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getURL } from '@/lib/utils'

export async function signInWithGoogle() {
  const supabase = await createClient()
  const origin = getURL()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}auth/callback`,
    },
  })

  if (error) {
    console.error(error.message)
    return redirect('/login?message=Could not authenticate with Google')
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/')
}

export async function resetPasswordForEmail(email: string) {
  const supabase = await createClient()
  const origin = getURL()
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}auth/callback?next=/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }
  return { success: true }
}
export async function updatePassword(password: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({
    password: password
  })
  
  if (error) {
    return { error: error.message }
  }
  return { success: true }
}
