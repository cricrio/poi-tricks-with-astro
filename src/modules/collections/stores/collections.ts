import type { UpdateCollectionAction } from '../types';
import { $store, StoreHandler } from '../../store';

const collectionStore = new StoreHandler($store, 'collections');

export const setCollections = (collections: any[]) => {
  collectionStore.set(collections);
};

export const updateCollectionStore = collectionStore.action(
  'updateCollection',
  ([collections, set], action: UpdateCollectionAction) => {
    if (action.type === 'add') {
      set([
        ...(collections || []),
        { trickId: action.trickId, category: action.category },
      ]);
    } else if (action.type === 'remove') {
      set(collections.filter((c) => c.trickId !== action.trickId));
    }

    return action;
  }
);

export const setCollectionId = collectionStore.action(
  'setCollectionId',
  ([state, set], action: { id: string; action: UpdateCollectionAction }) => {
    if (state) {
      const collections = state.map((c) =>
        c.trickId === action.action.trickId &&
        c.category === action.action.category
          ? { ...c, id: action.id }
          : c
      );
      set(collections);
    }
  }
);

export const useCollections = (trickId: string) => {
  const collections = collectionStore.useStore();
  if (collections) {
    return collections.find((c) => c.trickId === trickId);
  }
};
