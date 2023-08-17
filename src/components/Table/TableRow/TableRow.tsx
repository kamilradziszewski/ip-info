import { IPRecord } from "../../../stores/dataStore";
import { formatDate } from "../../../utils/formatDate";

function TableRow({ record }: { record: IPRecord }) {
  return (
    <tr key={record.query}>
      <td>{record.query}</td>
      <td>{record.country || "—"}</td>
      <td>{record.org || "—"}</td>
      <td>{formatDate(record.requestTime)}</td>
      <td>{formatDate(record.responseTime)}</td>
    </tr>
  );
}

export default TableRow;
