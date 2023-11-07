import { type Client } from '@/supabase';

class AuthProvider {
  supabase: Client;
  constructor(supabase: Client) {
    this.supabase = supabase;
  }

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
