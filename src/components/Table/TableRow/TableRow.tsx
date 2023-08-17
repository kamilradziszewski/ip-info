import { LuAlertCircle } from "react-icons/lu";

import { IPRecord } from "../../../stores/dataStore";
import { useStore } from "../../../stores/store";
import { formatDate } from "../../../utils/formatDate";

function TableRow({ record }: { record: IPRecord }) {
  const { modalStore } = useStore();

  const requestTimeArray = formatDate(record.requestTime);
  const responseTimeArray = formatDate(record.responseTime);

  const hasStatusFail = record.status === "fail";

  return (
    <tr
      key={record.query}
      className={`Table__TbodyTr ${
        record.status === "fail" ? "Table__TbodyTr--Error" : ""
      }`}
      onClick={() => (hasStatusFail ? null : modalStore.setModalData(record))}
    >
      <td className="Table__Td">
        <div
          className={`Table__TdContent ${
            hasStatusFail ? "Table__TdContent--Error" : ""
          }`}
        >
          {record.query}
          {hasStatusFail && (
            <div className="Table__Error">
              <LuAlertCircle className="Table__ErrorIcon" />
              <div className="Table__ErrorTooltip">Error: {record.message}</div>
            </div>
          )}
        </div>
      </td>
      <td className="Table__Td">
        {requestTimeArray[0]}
        <span className="Timestamp__Milliseconds">.{requestTimeArray[1]}</span>
      </td>
      <td className="Table__Td">
        {responseTimeArray[0]}
        <span className="Timestamp__Milliseconds">.{responseTimeArray[1]}</span>
      </td>
      <td className="Table__Td Table__Td--AlignLeft">
        {record.country || "—"}
      </td>
      <td className="Table__Td Table__Td--AlignLeft">{record.org || "—"}</td>
    </tr>
  );
}

export default TableRow;
