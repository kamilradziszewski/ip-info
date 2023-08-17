import { createContext, useContext } from "react";

import DataStore from "./dataStore";
import ModalStore from "./modalStore";

export class RootStore {
  dataStore: DataStore;
  modalStore: ModalStore;

  constructor() {
    this.dataStore = new DataStore(this);
    this.modalStore = new ModalStore(this);
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);

export function useStore() {
  return useContext(StoreContext);
}
