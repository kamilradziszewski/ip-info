import { FormEvent, useState } from "react";

import { Observer } from "mobx-react-lite";

import { CgSpinner } from "react-icons/cg";
import { LuSearch } from "react-icons/lu";

import { useStore } from "../../stores/store";

import "./Search.scss";

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
        `Invalid IP Address format: ${invalidIpAddress}`,
      );
      return;
    }

    const duplicateIp = ipArray.find((ipAddress) =>
      dataStore.apiData.find((storeRecord) => storeRecord.query === ipAddress),
    );
    if (duplicateIp) {
      dataStore.setSearchInputValidationError(
        `IP Address ${duplicateIp} is already fetched. Exclude it from the query`,
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
        <form onSubmit={handleSubmit} className="Search">
          <div className="Search__Row">
            <label htmlFor="search-input" className="Search__InputLabel">
              Enter IP addresses separated by comas
            </label>
          </div>
          <div className="Search__Row">
            <div className="Search__InputWrapper">
              <input
                type="search"
                value={searchInputValue}
                id="search-input"
                onChange={(e) => {
                  dataStore.setSearchInputValidationError("");
                  setSearchInputValue(e.target.value);
                }}
                className={`Input Search__Input ${
                  dataStore.searchInputValidationError
                    ? "Search__Input--Error"
                    : ""
                }`}
              />
              <LuSearch className="Search__InputIcon" size="18px" />
            </div>

            <button
              type="submit"
              disabled={dataStore.isLoading}
              className={`Button Button__Primary Search__Button ${
                dataStore.isLoading ? "Search__Button--Loading" : ""
              }`}
            >
              {dataStore.isLoading ? (
                <>
                  <CgSpinner className="Search__ButtonSpinner" /> Loading…
                </>
              ) : (
                "Fetch data"
              )}
            </button>
            <button
              type="button"
              disabled={dataStore.isLoading}
              onClick={() => {
                dataStore.clearData();
                setSearchInputValue("");
              }}
              className="Button Button__Danger Search__Button"
            >
              Clear data
            </button>
          </div>
          <div className="Search__Row">
            <div className="Search__ErrorMessage">
              {dataStore.searchInputValidationError ? (
                <>{dataStore.searchInputValidationError}</>
              ) : null}
            </div>
          </div>
        </form>
      )}
    </Observer>
  );
}

export default Search;
