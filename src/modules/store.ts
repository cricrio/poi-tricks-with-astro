import { useStore } from '@nanostores/react';
import {
  deepMap,
  type AllPaths,
  type DeepMapStore,
  getPath,
  action,
  listenKeys,
} from 'nanostores';

type MapStore = { userId?: string; collections?: any[] };

export const $store = deepMap<MapStore>({});

export class StoreHandler {
  store: DeepMapStore<MapStore>;
  key: AllPaths<MapStore>;

  constructor(store: DeepMapStore<MapStore>, key: AllPaths<MapStore>) {
    this.store = store;
    this.key = key;
  }

  public set(value: any) {
    return this.store.setKey(this.key, value);
  }
  public get() {
    const value = this.store.get();
    return getPath(value, this.key);
  }

  public useStore() {
    const value = useStore(this.store, { keys: [this.key] });
    return getPath(value, this.key);
  }

  public action(
    name: string,
    callback: (
      [state, setStore]: [any, (value: any) => void],
      action: any
    ) => void
  ) {
    return action(this.store, name, (store, action) => {
      const storeHandler = new StoreHandler(store, this.key);
      callback(
        [storeHandler.get(), (value) => storeHandler.set(value)],
        action
      );
    });
  }

  public subscribe(callback: (value: any) => void) {
    return listenKeys(this.store, [this.key], callback);
  }
}
