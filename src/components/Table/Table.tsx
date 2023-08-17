import { Observer } from "mobx-react-lite";

import { useStore } from "../../stores/store";
import { formatDate } from "../../utils/formatDate";
import Modal from "../Modal/Modal";

import "./IPDetails.scss";
import "./Table.scss";
import TableRow from "./TableRow/TableRow";

function Table() {
  const { dataStore, modalStore } = useStore();

  return (
    <Observer>
      {() => (
        <>
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
                {dataStore.apiData.length > 0 ? (
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <input
                        type="search"
                        className="Input Table__CountrySearchInput"
                        placeholder="Filter by country"
                        onChange={(e) => {
                          dataStore.setSearchPhrase(e.target.value);
                        }}
                      />
                    </td>
                    <td></td>
                  </tr>
                ) : null}
              </thead>
              <tbody className="Table__Tbody">
                {dataStore.filteredApiData.length > 0 ? (
                  dataStore.filteredApiData.map((record) => (
                    <TableRow key={record.query} record={record} />
                  ))
                ) : (
                  <tr>
                    <td className="Table__EmptyState" colSpan={5}>
                      {dataStore.searchPhrase !== ""
                        ? "Country not found"
                        : "No data to display"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Modal>
            <div className="IPDetails">
              <div className="IPDetails__Title">IP Address Details</div>
              {modalStore.modalData && (
                <table className="IPDetails__Table">
                  <tbody>
                    <tr>
                      <td className="IPDetails__TableCell IPDetails__TableCell--Title">
                        IP Address
                      </td>
                      <td className="IPDetails__TableCell">
                        {modalStore.modalData.query}
                      </td>
                    </tr>
                    <tr>
                      <td className="IPDetails__TableCell IPDetails__TableCell--Title">
                        Request Time
                      </td>
                      <td className="IPDetails__TableCell">
                        {formatDate(modalStore.modalData.requestTime)[0]}
                        <span className="Timestamp__Milliseconds">
                          .{formatDate(modalStore.modalData.requestTime)[1]}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="IPDetails__TableCell IPDetails__TableCell--Title">
                        Response Time
                      </td>
                      <td className="IPDetails__TableCell">
                        {formatDate(modalStore.modalData.responseTime)[0]}
                        <span className="Timestamp__Milliseconds">
                          .{formatDate(modalStore.modalData.responseTime)[1]}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="IPDetails__TableCell IPDetails__TableCell--Title">
                        Country
                      </td>
                      <td className="IPDetails__TableCell">
                        {modalStore.modalData.country || "—"}
                      </td>
                    </tr>
                    <tr>
                      <td className="IPDetails__TableCell IPDetails__TableCell--Title">
                        Company
                      </td>
                      <td className="IPDetails__TableCell">
                        {modalStore.modalData.org || "—"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </Modal>
        </>
      )}
    </Observer>
  );
}

export default Table;
