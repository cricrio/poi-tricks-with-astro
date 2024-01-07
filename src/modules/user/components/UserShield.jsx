import { useCurrentUserId } from '../store';

const ConnectedShield = ({ children, notConnected = null }) => {
  const userId = useCurrentUserId();
  if (userId) {
    return children;
  } else return notConnected;
};

export default ConnectedShield;
