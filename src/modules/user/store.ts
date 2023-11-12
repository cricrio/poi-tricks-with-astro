import { $store, StoreHandler } from '../store';

export const userStore = new StoreHandler($store, 'userId');
export const setCurrentUserId = (userId?: string) => {
  userStore.set(userId);
};

export const getCurrentUserId = () => {
  return userStore.get();
};

export const useCurrentUserId = userStore.useStore.bind(userStore);

export const onUserChange = (
  callback: (value: { userId?: string }) => void
) => {
  userStore.subscribe(callback);
};
