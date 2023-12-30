import { redirectUrl } from '@/config';
import SupabaseProvider from '../supabase/provider';

class AuthProvider extends SupabaseProvider {
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
    });
  };
}

export default AuthProvider;
