import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getURL } from '@/lib/utils'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const origin = getURL()
      return NextResponse.redirect(`${origin}${next.startsWith('/') ? next.slice(1) : next}`)
    }
  }

  // return the user to an error page with instructions
  const origin = getURL()
  return NextResponse.redirect(`${origin}login?message=Could not login with provider`)
}
