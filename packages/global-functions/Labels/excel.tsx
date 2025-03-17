import * as xlsx from "xlsx";
import * as reducers from "./reducers";
import { Buffer } from "buffer";
import applicationLocales from "../Constants/applicationLocales";

export type CsvRow = unknown[];

export function toXlsx(object: Record<string, unknown>): Buffer {
  const allKeys = Object.keys(object);
  const locales = allKeys
    .map((key) => key.split(".")[0])
    .reduce<string[]>((unique, current) => {
      if (current !== undefined && !unique.includes(current)) {
        unique.push(current);
      }
      return unique;
    }, []);

  const uniqueKeys = allKeys
    .map((key) => key.split(".").slice(1).join("."))
    .reduce(reducers.unique, [] as string[]);

  const header = ["key", ...locales];

  const rows = uniqueKeys.reduce((rows, key) => {
    const columns: unknown[] = [key];
    const values = locales.map((locale) => {
      const labelKey = `${locale}.${key}`;
      return object[labelKey];
    });

    rows.push(columns.concat(values));

    return rows;
  }, [] as CsvRow[]);

  const worksheet = xlsx.utils.aoa_to_sheet([header, ...rows]);

  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const out = xlsx.write(workbook, { bookType: "xlsx", type: "binary" });

  const buffer = Buffer.from(out, "binary");
  return buffer;
}

export function fromXlsx(
  xlsxDataDe: Buffer,
  xlsxDataEn: Buffer,
): Record<string, unknown> {
  const workbookDe = xlsx.read(xlsxDataDe, { type: "array" });
  const workbookEn = xlsx.read(xlsxDataEn, { type: "array" });

  const sheetNameDe = workbookDe.SheetNames[0];
  const sheetNameEn = workbookEn.SheetNames[0];

  if (!sheetNameDe || !sheetNameEn) {
    throw new Error("Sheet name is undefined");
  }

  const sheetDe = workbookDe.Sheets[sheetNameDe];
  const sheetEn = workbookEn.Sheets[sheetNameEn];

  if (!sheetEn || !sheetDe) {
    throw new Error("Sheet is undefined");
  }

  const jsonDataDe = xlsx.utils.sheet_to_json(sheetDe, {
    header: 1,
    defval: "",
  });
  const jsonDataEn = xlsx.utils.sheet_to_json(sheetEn, {
    header: 1,
    defval: "",
  });

  const rowsDe = jsonDataDe.slice(0) as string[][];
  const rowsEn = jsonDataEn.slice(0) as string[][];

  const locales = Object.values(applicationLocales).map(
    (locale: { locale: string }) => locale.locale,
  );

  const labels: Record<string, unknown> = {};

  rowsDe.forEach((row) => {
    const key = row[0];

    const valueDe = row[1];
    const valueEn = rowsEn.find((rowEn) => rowEn[0] === key)?.[1];

    locales.forEach((locale) => {
      if (!labels[`${locale}.${key}`]) {
        labels[`${locale}.${key}`] = {};
      }
      if (locale === "de-DE" && valueDe) {
        labels[`${locale}.${key}`] = valueDe;
      }

      if (locale === "en-GB" && valueEn) {
        labels[`${locale}.${key}`] = valueEn;
      }
    });
  });
  return labels;
}
