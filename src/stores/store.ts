import { createContext, useContext } from "react";

import DataStore from "./dataStore";

export class RootStore {
  dataStore: DataStore;

  constructor() {
    this.dataStore = new DataStore(this);
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);

export function useStore() {
  return useContext(StoreContext);
}
