import dayjs from "dayjs";

export function formatDate(date: number) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss.SSS");
}
