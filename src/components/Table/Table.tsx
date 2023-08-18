import { Observer } from "mobx-react-lite";

import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { SortKey } from "../../stores/dataStore";
import { useStore } from "../../stores/store";
import { formatDate } from "../../utils/formatDate";
import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";

import "./IPDetails.scss";
import "./Table.scss";
import TableRow from "./TableRow/TableRow";

function Table() {
  const { dataStore, modalStore, paginationStore } = useStore();

  function getSortKey(param: "request" | "response"): SortKey {
    if (param === "request") {
      return ["", "resAsc", "resDesc"].includes(dataStore.sortKey)
        ? "reqAsc"
        : dataStore.sortKey === "reqAsc"
        ? "reqDesc"
        : "";
    } else if (param === "response") {
      return ["", "reqAsc", "reqDesc"].includes(dataStore.sortKey)
        ? "resAsc"
        : dataStore.sortKey === "resAsc"
        ? "resDesc"
        : "";
    } else {
      return "";
    }
  }

  return (
    <Observer>
      {() => (
        <>
          <div className="Table__Wrapper">
            <table className="Table">
              <thead className="Table__Thead">
                <tr>
                  <th className="Table__Th">IP Address</th>
                  <th className="Table__Th">
                    <div
                      className="Table__ThContent Table__Sort"
                      onClick={() => {
                        dataStore.setSortKey(getSortKey("request"));
                      }}
                    >
                      Request Time
                      <div className="Table__SortArrows">
                        <TiArrowSortedUp
                          className={`Table__SortArrow Table__SortArrowUp ${
                            dataStore.sortKey === "reqAsc"
                              ? "Table__SortArrowUp--Active"
                              : ""
                          }`}
                          size="18px"
                        />
                        <TiArrowSortedDown
                          className={`Table__SortArrow Table__SortArrowDown ${
                            dataStore.sortKey === "reqDesc"
                              ? "Table__SortArrowDown--Active"
                              : ""
                          }`}
                          size="18px"
                        />
                      </div>
                    </div>
                  </th>
                  <th className="Table__Th">
                    <div
                      className="Table__ThContent Table__Sort"
                      onClick={() => {
                        dataStore.setSortKey(getSortKey("response"));
                      }}
                    >
                      Response Time{" "}
                      <div className="Table__SortArrows">
                        <TiArrowSortedUp
                          className={`Table__SortArrow Table__SortArrowUp ${
                            dataStore.sortKey === "resAsc"
                              ? "Table__SortArrowUp--Active"
                              : ""
                          }`}
                          size="18px"
                        />
                        <TiArrowSortedDown
                          className={`Table__SortArrow Table__SortArrowDown ${
                            dataStore.sortKey === "resDesc"
                              ? "Table__SortArrowDown--Active"
                              : ""
                          }`}
                          size="18px"
                        />
                      </div>
                    </div>
                  </th>
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
                  dataStore.filteredApiData
                    .slice(
                      paginationStore.rowsPerPage *
                        (paginationStore.currentPage - 1),
                      paginationStore.rowsPerPage * paginationStore.currentPage,
                    )
                    .map((record) => (
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

          {dataStore.apiData.length > 0 && <Pagination />}

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
