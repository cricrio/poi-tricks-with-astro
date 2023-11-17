import { redirectUrl } from '@/config';
import { type Client } from '@/modules/supabase';

class AuthProvider {
  supabase: Client;
  constructor(supabase: Client) {
    this.supabase = supabase;
  }

  login = (email: string) => {
    return this.supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
  };

  onAuthChange = (callback: (userId?: string) => void) => {
    this.supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log(session?.user);
      callback(session?.user?.id);
    });

    this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user?.id);

      // if (_event === 'SIGNED_OUT') {
      //   // delete cookies on sign out
      //   const expires = new Date(0).toUTCString();
      //   document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
      //   document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
      // } else if (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED') {
      //   const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
      //   document.cookie = `my-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
      //   document.cookie = `my-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
      // }
    });
  };
}

export default AuthProvider;
