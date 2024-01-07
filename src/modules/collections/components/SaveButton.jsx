import { updateCollection, useCollections } from '@/modules/collections/';
import { Button } from '@/modules/ui/button.tsx';
import NotConnectedDialog from './NotConnectedDialog.tsx';
import UserShield from '@/modules/user/components/UserShield.jsx';

const SaveButton = ({ trickId }) => {
  const collection = useCollections(trickId);
  console.log(collection);
  return (
    <Button
      variant='outline'
      className='capitalize'
      onClick={() =>
        updateCollection({
          trickId,
          category: 'saved',
          id: collection?.id,
          type: collection?.category ? 'remove' : 'add',
        })
      }
    >
      {collection?.category || 'Save'}
    </Button>
  );
};

const ProtectedButton = ({ trickId }) => {
  return (
    <UserShield notConnected={<NotConnectedDialog />}>
      <SaveButton trickId={trickId} />
    </UserShield>
  );
};

export default ProtectedButton;
