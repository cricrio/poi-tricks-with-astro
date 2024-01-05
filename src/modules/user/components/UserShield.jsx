import { useCurrentUserId } from '../store';

const ConnectedShield = ({ children }) => {
  const userId = useCurrentUserId();
  if (userId) {
    return children;
  } else return null;
};

export default ConnectedShield;
