import { createComponentClient } from '@/modules/supabase';
import { updateCollectionStore, setCollectionId } from './store';
import CollectionProvider from './provider';
import { getCurrentUserId } from '../user/store';
import type { UpdateCollectionAction } from './types';

export { useCollections } from './store';

export const updateCollection = async (action: UpdateCollectionAction) => {
  const supabase = createComponentClient();
  const userId = getCurrentUserId();

  const collectionProvider = new CollectionProvider(supabase, userId);

  updateCollectionStore(action);

  if (action.type === 'add') {
    const { id } = await collectionProvider.insert({
      trickId: action.trickId,
      category: action.category,
    });
    console.log('id', id);
    setCollectionId({ id, action });
    console.log('new id set');
  } else if (action.type === 'remove') {
    collectionProvider.removeById(action.id);
  }
};
