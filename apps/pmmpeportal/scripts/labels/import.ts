"use strict";
import {
  exportConst,
  writeSourceFile,
} from "@repo/global-functions/Labels/astify";
import { fromXlsx } from "@repo/global-functions/Labels/excel";
import { unflatten } from "@repo/global-functions/Labels/flatten";
/**
 * Note: As this is a TS source file, this needs to be located
 * inside the src folder of the project, hence the new scripts
 * folder in here
 */
import fs from "fs";
import path from "path";

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
function importLabels(): void {
  if (process.argv.length < 5) {
    console.error(`Not enough arguments`);
    console.log(`usage: [npx] ts-node import.ts <source> <target>`);
    process.exit(-1);
  }
  const targetPath = process.argv[2];
  const sourcePathDE = process.argv[3];
  const sourcePathEN = process.argv[4];

  if (sourcePathDE && sourcePathEN && targetPath) {
    const absoluteSourcePathDE = path.resolve(sourcePathDE);
    const absoluteSourcePathEN = path.resolve(sourcePathEN);

    if (
      !fs.existsSync(absoluteSourcePathDE) ||
      !fs.statSync(absoluteSourcePathDE).isFile()
    ) {
      throw new Error(
        `${absoluteSourcePathDE} does not exist or is not a file`,
      );
    }
    if (
      !fs.existsSync(absoluteSourcePathEN) ||
      !fs.statSync(absoluteSourcePathEN).isFile()
    ) {
      throw new Error(
        `${absoluteSourcePathEN} does not exist or is not a file`,
      );
    }

    const contentsDE = fs.readFileSync(absoluteSourcePathDE);
    const contentsEN = fs.readFileSync(absoluteSourcePathEN);

    const labels = fromXlsx(contentsDE, contentsEN);
    console.log("labels", labels);
    const record = unflatten(fromXlsx(contentsDE, contentsEN), 1);
    console.log("record", record);

    const absoluteTargetPath = path.resolve(targetPath);

    const statement = exportConst("LABELS", record);

    writeSourceFile([statement], absoluteTargetPath);
  }
}

importLabels();
