import { createComponentClient } from '@/supabase';
import AuthProvider from '@/modules/auth/provider';
const AuthForm = () => {
  const supabaseClient = createComponentClient();
  const authProvider = new AuthProvider(supabaseClient);

  const login = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const { error } = await supabaseClient.auth.signInWithOtp({
      email: formData.get('email'),
    });
  };

  return (
    <form method='post' onSubmit={login}>
      <input type='email' placeholder='Email' name='email' />
      <button type='submit'>Login</button>
    </form>
  );
};

export default AuthForm;
