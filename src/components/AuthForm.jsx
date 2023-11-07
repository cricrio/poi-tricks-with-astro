import { createComponentClient } from '@/supabase';

const AuthForm = () => {
  const supabaseClient = createComponentClient();
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
