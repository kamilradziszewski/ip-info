import { Observer } from "mobx-react-lite";

import { useStore } from "../../stores/store";

import "./Table.scss";
import TableRow from "./TableRow/TableRow";

function Table() {
  const { dataStore } = useStore();

  return (
    <Observer>
      {() => (
        <div className="Table__Wrapper">
          <table className="Table">
            <thead className="Table__Thead">
              <tr>
                <th className="Table__Th">IP Address</th>
                <th className="Table__Th">Request Time</th>
                <th className="Table__Th">Response Time</th>
                <th className="Table__Th">Country</th>
                <th className="Table__Th">Company</th>
              </tr>
            </thead>
            <tbody className="Table__Tbody">
              {dataStore.apiData.length > 0 ? (
                dataStore.apiData.map((record) => (
                  <TableRow key={record.query} record={record} />
                ))
              ) : (
                <tr>
                  <td className="Table__EmptyState" colSpan={5}>
                    No data to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Observer>
  );
}

export default Table;
