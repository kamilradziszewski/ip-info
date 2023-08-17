import { IPRecord } from "../../../stores/dataStore";

function TableRow({ record }: { record: IPRecord }) {
  return (
    <tr key={record.query}>
      <td>{record.query}</td>
      <td>{record.country || "—"}</td>
      <td>{record.org || "—"}</td>
      <td>{record.requestTime}</td>
      <td>{record.responseTime}</td>
    </tr>
  );
}

export default TableRow;
