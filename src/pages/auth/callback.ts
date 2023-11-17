import { createServerClient } from '@supabase/ssr';
import { type APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/';
  console.log('GET request');
  console.log(cookies);

  if (code) {
    const supabase = createServerClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(key) {
            console.log(key);
            return cookies.get(key)?.value;
          },
          set(key, value, options) {
            cookies.set(key, value, options);
          },
          remove(key, options) {
            cookies.delete(key, options);
          },
        },
      }
    );

    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    console.log(data);
    if (!error) {
      return redirect(next);
    }
  }

  // return the user to an error page with instructions
  return redirect('/auth/auth-code-error');
};
