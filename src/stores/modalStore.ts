import { makeAutoObservable } from "mobx";

import { IPRecord } from "./dataStore";
import { RootStore } from "./store";

export default class ModalStore {
  rootStore: RootStore;

  modalData: IPRecord | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  setModalData(modalData: IPRecord | null) {
    this.modalData = modalData;
  }
}
