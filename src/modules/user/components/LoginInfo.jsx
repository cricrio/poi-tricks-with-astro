import { useCurrentUserId } from '../store';

const LoginInfo = () => {
  const userId = useCurrentUserId();
  if (userId) {
    return <a href='/me'>me</a>;
  }
  return <a href='/login'>login</a>;
};

export default LoginInfo;
