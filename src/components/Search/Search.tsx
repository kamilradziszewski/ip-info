import { FormEvent, useState } from "react";

import { useStore } from "../../stores/store";

function Search() {
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
  );
}

export default Search;
