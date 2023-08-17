import dayjs from "dayjs";

export function formatDate(date: number): [string, string] {
  return [dayjs(date).format("YYYY-MM-DD HH:mm:ss"), dayjs(date).format("SSS")];
}
