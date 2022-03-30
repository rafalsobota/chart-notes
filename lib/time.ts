import { format } from "date-fns";
import { Timestamp } from "./api";

export const parseYear = (year: string | string[] | undefined): number => {
  try {
    if (typeof year === "string") {
      return parseInt(year, 10);
    } else if (Array.isArray(year)) {
      return parseInt(year[0], 10);
    } else {
      return new Date().getFullYear();
    }
  } catch (e) {
    return new Date().getFullYear();
  }
}

export const formatDate = (date: Timestamp, year?: boolean) => {
  return format(new Date(date), year ? "d.MM.yyyy" : "d.MM");
};

export const parseDate = (date: string | string[] | undefined): number | undefined => {
  try {
    if (typeof date === "string") {
      return new Date(Number(date)).getTime();
    } else if (Array.isArray(date)) {
      return new Date(Number(date[0])).getTime();
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
}