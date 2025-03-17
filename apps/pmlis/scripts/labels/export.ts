"use strict";
/**
 * Note: As this is a TS source file, this needs to be located
 * inside the src folder of the project, hence the new scripts
 * folder in here
 */

import fs from "fs";
import path from "path";
import { flatten } from "@repo/global-functions/Labels/flatten";
import { toXlsx } from "@repo/global-functions/Labels/excel";
import { LABELS } from "../../constants";

export interface LabelRecord {
  [key: string]: LabelRecord | string;
}

/**
 * Function for CLI use to export labels.
 *
 * The labels are imported as a regular JS module and passed
 * into the function invocation at the end of the file
 *
 * ```txt
 * usage: [npx] ts-node export.ts <target>
 * ```
 */
function exportLabels(record: LabelRecord): void {
  if (process.argv.length < 2) {
    console.error(
      `Not enough arguments, please provide the path to a target file`,
    );
    console.log(`usage: [npx] ts-node export.ts <target>`);
    process.exit(-1);
  }

  const targetPath = "labels.xlsx";
  const absoluteTargetPath = path.resolve(targetPath);

  if (fs.existsSync(absoluteTargetPath)) {
    const targetStats = fs.statSync(absoluteTargetPath);

    if (!targetStats.isFile()) {
      throw new Error(`Path ${absoluteTargetPath} exists and is not a file`);
    }

    console.warn(`Target file ${absoluteTargetPath} will be overwritten`);
  }

  const xlsx = toXlsx(flatten(record));

  fs.writeFileSync(absoluteTargetPath, xlsx, { encoding: "utf-8" });

  console.log(`Labels exported to ${absoluteTargetPath}`);
}

exportLabels(LABELS);
