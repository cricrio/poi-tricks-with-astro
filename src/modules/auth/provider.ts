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
      callback(session?.user?.id);
    });

    this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user?.id);
    });
  };
}

export default AuthProvider;
