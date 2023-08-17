import { FormEvent, useState } from "react";

import { Observer } from "mobx-react-lite";

import "./App.scss";
import { useStore } from "./stores/store";

function App() {
  const { dataStore } = useStore();

  const [searchInputValue, setSearchInputValue] = useState<string>("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const ipArray = [...new Set(searchInputValue.split(","))].map((ipAddress) =>
      ipAddress.trim(),
    );

    dataStore.fetchData(ipArray);

    setSearchInputValue("");
  }

  return (
    <Observer>
      {() => (
        <>
          <p>IP Info</p>
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
            <button type="submit">Fetch data</button>
            <button type="button" onClick={() => dataStore.clearData()}>
              Clear data
            </button>
          </form>

          {dataStore.apiData.length > 0 &&
            dataStore.apiData.map((record) => (
              <div key={record.query}>{Object.values(record).join(" • ")}</div>
            ))}
        </>
      )}
    </Observer>
  );
}

export default App;
