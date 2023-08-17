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

export default class DataStore {
  rootStore: RootStore;

  apiData: IPRecord[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  fetchData = async (ipArray: string[]) => {
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
      });
    } catch (error) {
      console.error(error);
    }
  };

  clearData() {
    this.apiData = [];
  }
}
