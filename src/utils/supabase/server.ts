import { createServerClient, parseCookieHeader } from '@supabase/ssr'

export function createClient(context: { request: Request }) {
  return createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(context.request.headers.get('Cookie') ?? '')
            .map(({ name, value }) => ({ name, value: value ?? '' }))
        },
        setAll() {},
      },
    }
  )
}