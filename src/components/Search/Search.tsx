import { FormEvent, useState } from "react";

import { Observer } from "mobx-react-lite";

import { useStore } from "../../stores/store";

function Search() {
  const { dataStore } = useStore();

  const [searchInputValue, setSearchInputValue] = useState<string>("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (searchInputValue === "") {
      return;
    }

    const ipArray = [
      ...new Set(
        searchInputValue.replace(/,,+/, ",").replace(/^,|,$/g, "").split(","),
      ),
    ].map((ipAddress) => ipAddress.trim());

    const invalidIpAddress = ipArray.find(
      (ipAddress) =>
        !/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/.test(
          ipAddress,
        ),
    );
    if (invalidIpAddress) {
      dataStore.setSearchInputValidationError(
        `Invalid IP Address format: "${invalidIpAddress}"`,
      );
      return;
    }

    const duplicateIp = ipArray.find((ipAddress) =>
      dataStore.apiData.find((storeRecord) => storeRecord.query === ipAddress),
    );
    if (duplicateIp) {
      dataStore.setSearchInputValidationError(
        `IP Address ${duplicateIp} is already fetched. Remove it from the search`,
      );
      return;
    }

    if (ipArray.length > 100) {
      dataStore.setSearchInputValidationError(
        "Max number of allowed IP addresses is 100",
      );
      return;
    }

    dataStore.fetchData(ipArray);

    setSearchInputValue("");
  }

  return (
    <Observer>
      {() => (
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            value={searchInputValue}
            onChange={(e) => {
              dataStore.setSearchInputValidationError("");
              setSearchInputValue(e.target.value);
            }}
          />
          {dataStore.searchInputValidationError ? (
            <>{dataStore.searchInputValidationError}</>
          ) : null}
          <button type="submit" disabled={dataStore.isLoading}>
            {dataStore.isLoading ? "Loading…" : "Fetch data"}
          </button>
          <button
            type="button"
            disabled={dataStore.isLoading}
            onClick={() => {
              dataStore.clearData();
              setSearchInputValue("");
            }}
          >
            Clear data
          </button>
        </form>
      )}
    </Observer>
  );
}

export default Search;
