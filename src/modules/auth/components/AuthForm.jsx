import { createComponentClient } from '@/modules/supabase';
import AuthProvider from '@/modules/auth/provider';
import { useState } from 'react';
const AuthForm = () => {
  const supabaseClient = createComponentClient();
  const authProvider = new AuthProvider(supabaseClient);
  const [error, setError] = useState(null);
  const login = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    setError(null);
    const { error } = await authProvider.login(formData.get('email'));
    setError(error);
  };

  return (
    <form method='post' onSubmit={login}>
      <input type='email' placeholder='Email' name='email' />
      <button type='submit'>Login</button>
      {error && <span className='red'>{error.message}</span>}
    </form>
  );
};

export default AuthForm;
