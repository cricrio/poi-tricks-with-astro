import { $store, StoreHandler } from '../store';

export const userStore = new StoreHandler($store, 'userId');
export const setCurrentUserId = (userId?: string) => {
  userStore.set(userId);
};

export const getCurrentUserId = () => {
  return userStore.get();
};

export const useCurrentUserId = userStore.useStore;

export const onUserChange = (
  callback: (value: { userId?: string }) => void
) => {
  console.log(userStore);
  userStore.subscribe(callback);
};
