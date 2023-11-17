import { updateCollection, useCollections } from '@/modules/collections/';

const SaveInCollectionButton = ({ trickId }) => {
  const collection = useCollections(trickId);
  return (
    <button
      className={`badge badge-accent p-3 ${
        collection?.category ? '' : 'badge-outline'
      }`}
      onClick={() =>
        updateCollection({
          trickId,
          category: 'saved',
          id: collection?.id,
          type: collection?.category ? 'remove' : 'add',
        })
      }
    >
      {collection?.category || 'save'}
    </button>
  );
};

export default SaveInCollectionButton;
