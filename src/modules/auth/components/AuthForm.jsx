import AuthProvider from '@/modules/auth/provider';
import { Button } from '@/modules/ui/button';
import { Input } from '@/modules/ui/input';
import { Label } from '@/modules/ui/label';
import { useState } from 'react';
const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authProvider = new AuthProvider();

  const [error, setError] = useState(null);
  const login = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    setError(null);
    const { error } = await authProvider.login(formData.get('email'));
    setIsLoading(false);
    setError(error);
  };

  return (
    <form method='post' onSubmit={login}>
      <div className='grid gap-2'>
        <div className='grid gap-1'>
          <Label className='sr-only' htmlFor='email'>
            Email
          </Label>
          <Input
            id='email'
            placeholder='name@example.com'
            type='email'
            autoCapitalize='none'
            autoComplete='email'
            autoCorrect='off'
            disabled={isLoading}
          />
        </div>
        <Button disabled={isLoading}>Log in with Email</Button>
      </div>
    </form>
  );
};

export default AuthForm;
