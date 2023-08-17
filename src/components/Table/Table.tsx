import { Observer } from "mobx-react-lite";

import { useStore } from "../../stores/store";

function Table() {
  const { dataStore } = useStore();

  return (
    <Observer>
      {() => (
        <table border={1}>
          <thead>
            <tr>
              <th>IP Address</th>
              <th>Country</th>
              <th>Company</th>
              <th>Request Time</th>
              <th>Response Time</th>
            </tr>
          </thead>
          <tbody>
            {dataStore.apiData.length > 0 ? (
              dataStore.apiData.map((record) => (
                <tr key={record.query}>
                  <td>{record.query}</td>
                  <td>{record.country || "—"}</td>
                  <td>{record.org || "—"}</td>
                  <td>{record.requestTime}</td>
                  <td>{record.responseTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No data to display.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </Observer>
  );
}

export default Table;
