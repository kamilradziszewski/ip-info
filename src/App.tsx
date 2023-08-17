import { Observer } from "mobx-react-lite";

import "./App.scss";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Table from "./components/Table/Table";

function App() {
  return (
    <Observer>
      {() => (
        <>
          <Header />
          <Search />
          <Table />
        </>
      )}
    </Observer>
  );
}

export default App;
