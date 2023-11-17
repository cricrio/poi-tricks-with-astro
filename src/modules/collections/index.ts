import { createComponentClient } from '@/modules/supabase';
import { updateCollectionStore, setCollectionId } from './stores/collections';
import CollectionProvider from './provider';
import { getCurrentUserId } from '../user/store';
import type { UpdateCollectionAction } from './types';

export { useCollections } from './stores/collections';

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
    setCollectionId({ id, action });
  } else if (action.type === 'remove') {
    collectionProvider.removeById(action.id);
  }
};
