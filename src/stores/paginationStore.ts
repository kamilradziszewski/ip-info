import { makeAutoObservable } from "mobx";

import { RootStore } from "./store";

export default class PaginationStore {
  rootStore: RootStore;

  currentPage: number = 1;
  rowsPerPage: number = 10;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  setCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
  }

  setRowsPerPage(rowsPerPage: number) {
    this.rowsPerPage = rowsPerPage;
    this.currentPage = 1;
  }

  get pagesCount() {
    return this.rootStore.dataStore.itemsCount <= this.rowsPerPage
      ? 1
      : Math.ceil(this.rootStore.dataStore.itemsCount / this.rowsPerPage);
  }

  get hasPrevPage() {
    return this.currentPage > 1;
  }
  get hasNextPage() {
    return this.currentPage < this.pagesCount;
  }
}
