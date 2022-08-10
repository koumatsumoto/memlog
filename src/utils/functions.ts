import { format } from "date-fns";
import ja from "date-fns/locale/ja";

export const printError = (e: Error) => `${e.name}: ${e.message}\n${e.stack}`;

export const prettyJson = (data: unknown) => JSON.stringify(data, null, 2);

export const formatDateTime = (time: number) => {
  return format(time, "MM月dd日 HH時mm分", { locale: ja });
};
