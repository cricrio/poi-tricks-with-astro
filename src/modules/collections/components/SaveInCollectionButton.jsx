import { updateCollection, useCollections } from '@/modules/collections/';

const SaveInCollectionButton = ({ trickId }) => {
  const collection = useCollections(trickId);
  return (
    <button
      className='badge badge-secondary'
      onClick={() =>
        updateCollection({
          trickId,
          category: 'saved',
          id: collection?.id,
          type: collection?.category ? 'remove' : 'add',
        })
      }
    >
      {collection?.category || 'enregistrer'}
    </button>
  );
};

export default SaveInCollectionButton;
