import { makeAutoObservable, runInAction } from "mobx";

import http from "../http/httpConfig";

import { RootStore } from "./store";

export interface IPRecord {
  query: string;
  status: string;
  message: string;
  country: string;
  org: string;
  requestTime: number;
  responseTime: number;
}

export type SortKey = "reqAsc" | "reqDesc" | "resAsc" | "resDesc" | "";

const sortMap: {
  [K in SortKey]: (a: IPRecord, b: IPRecord) => number;
} = {
  reqAsc: (a, b) => a.requestTime - b.requestTime,
  reqDesc: (a, b) => b.requestTime - a.requestTime,
  resAsc: (a, b) => a.responseTime - b.responseTime,
  resDesc: (a, b) => b.responseTime - a.responseTime,
  "": () => 0,
};

export default class DataStore {
  rootStore: RootStore;

  apiData: IPRecord[] = [];
  searchPhrase: string = "";
  sortKey: SortKey = "";

  searchInputValidationError: string = "";

  isLoading: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  fetchData = async (ipArray: string[]) => {
    this.isLoading = true;

    try {
      const requestTime = Date.now();

      const response = await http.post("", JSON.stringify(ipArray), {
        params: {
          fields: "query,status,message,country,org",
        },
      });

      runInAction(() => {
        const responseDataWithTimestamps = response.data.map(
          (record: IPRecord) => ({
            ...record,
            requestTime,
            responseTime: response.headers.responseTime,
          }),
        );

        this.apiData.push(...responseDataWithTimestamps);

        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);

      this.isLoading = false;
    }
  };

  clearData() {
    this.apiData = [];
    this.searchInputValidationError = "";
    this.searchPhrase = "";
    this.sortKey = "";
    this.rootStore.paginationStore.setCurrentPage(1);
  }

  setSearchInputValidationError(message: string) {
    this.searchInputValidationError = message;
  }

  setSearchPhrase(searchPhrase: string) {
    this.searchPhrase = searchPhrase;
    this.rootStore.paginationStore.setCurrentPage(1);
  }

  setSortKey(sortKey: SortKey) {
    this.sortKey = sortKey;
    this.rootStore.paginationStore.setCurrentPage(1);
  }

  get filteredApiData() {
    const filteredApiData =
      this.searchPhrase.trim() === ""
        ? this.apiData
        : this.apiData.filter(
            (record) =>
              record.country
                ?.toLowerCase()
                .includes(this.searchPhrase.toLowerCase().trim()),
          );

    return this.sortKey === ""
      ? filteredApiData
      : filteredApiData.slice().sort((a, b) => sortMap[this.sortKey](a, b));
  }

  get itemsCount() {
    return this.filteredApiData.length;
  }
}
