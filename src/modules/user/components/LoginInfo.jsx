import { useCurrentUserId } from '../store';

const LoginInfo = () => {
  const userId = useCurrentUserId();
  if (userId) {
    return 'loged';
  }
  return <a href='/login'>login</a>;
};

export default LoginInfo;
