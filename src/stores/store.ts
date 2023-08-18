import { createContext, useContext } from "react";

import DataStore from "./dataStore";
import ModalStore from "./modalStore";
import PaginationStore from "./paginationStore";

export class RootStore {
  dataStore: DataStore;
  modalStore: ModalStore;
  paginationStore: PaginationStore;

  constructor() {
    this.dataStore = new DataStore(this);
    this.modalStore = new ModalStore(this);
    this.paginationStore = new PaginationStore(this);
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);

export function useStore() {
  return useContext(StoreContext);
}
