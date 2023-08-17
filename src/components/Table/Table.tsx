import { Observer } from "mobx-react-lite";

import { useStore } from "../../stores/store";

import TableRow from "./TableRow/TableRow";

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
                <TableRow key={record.query} record={record} />
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
