import fs from "fs";
import path from "path";
import { ESLint } from "eslint";
import prettier, { Options } from "prettier";
import {
  ArrayLiteralExpression,
  createPrinter,
  Expression,
  factory,
  ImportDeclaration,
  isIdentifier,
  isLiteralExpression,
  NewLineKind,
  Node,
  NodeFlags,
  ObjectLiteralElementLike,
  ObjectLiteralExpression,
  PropertyAssignment,
  Statement,
  SyntaxKind,
  TypeNode,
  VariableStatement,
} from "typescript";

/** Maps an import property to an optional import name */
export type NamedImportRecord = Record<string, string | undefined>;
/** Combines an optional default import name with an optional named import record */
export type ImportTuple = [string | undefined, NamedImportRecord | undefined];
/** Maps a module name to an optional ImportTuple */
export type ImportRecord = Record<string, ImportTuple | undefined>;

const printer = createPrinter({ newLine: NewLineKind.LineFeed });

/**
 * Turns an array into an equivalent TypeScript
 * {@link ArrayLiteralExpression ArrayLiteralExpression} representing
 * the same array
 *
 * @param array An array of values
 * @returns An {@link ArrayLiteralExpression ArrayLiteralExpression}
 */
function array<T>(array: T[]): ArrayLiteralExpression {
  const elements: Expression[] = array.map(literal);

  return factory.createArrayLiteralExpression(elements, true);
}

/**
 * Turns an object into an equivalent TypeScript
 * {@link ObjectLiteralExpression ObjectLiteralExpression} representing
 * the same object
 *
 * @param object An object
 * @returns An {@link ObjectLiteralExpression ObjectLiteralExpression}
 */
function object(object: object): ObjectLiteralExpression {
  const properties: ObjectLiteralElementLike[] =
    Object.entries(object).map(property);

  return factory.createObjectLiteralExpression(properties, true);
}

/**
 * Turns a `[key, value]` as obtained from {@link Object.entries} into a
 * {@link PropertyAssignment PropertyAssignment} representing this same
 * assignment.
 *
 * @param entry A `[key, value]` tuple
 * @returns A {@link PropertyAssignment PropertyAssignment} assigning the `value` to the `key`
 */
function property(entry: [string, unknown]): PropertyAssignment {
  const [name, value] = entry;

  return factory.createPropertyAssignment(
    factory.createStringLiteral(name),
    literal(value),
  );
}

/**
 * Turns any value into it equivalent TypeScript {@link Expression Expression}.
 * The function determines the type of the value and then forms an appropriate literal
 * expression from it.
 * Supported
 *
 * - string
 * - number
 * - boolean
 * - object
 * - array
 *
 * @param value Any value
 * @returns A {@link Expression Expression} representing the value
 */
function literal(value: unknown): Expression {
  const type = typeof value;

  if (value === null) {
    return factory.createNull();
  }

  if (value === undefined) {
    return factory.createIdentifier("undefined");
  }

  switch (typeof value) {
    case "string":
      return factory.createStringLiteral(value);
    case "number":
      return factory.createNumericLiteral(value);
    case "boolean":
      return value === true ? factory.createTrue() : factory.createFalse();
    case "object": {
      const node = value as Node;
      return node && (isLiteralExpression(node) || isIdentifier(node))
        ? node
        : (() => {
            if (Array.isArray(value)) {
              return array(value);
            }
            return object(value);
          })();
    }
    default:
      throw new Error(`Can't build literal from ${value} with type ${type}`);
  }
}

/**
 * Helper function to quickly build imports from a set of given modules. The
 * {@link imports} record passed into the function maps module names to arrays
 * of identifiers to import from that module. Note that this function simply
 * passes the object's entries to the {@link importFrom} function, so only
 * named imports and only default names for these named imports are supported,
 * default imports and custom names can not be produced.
 *
 * @example
 * ```ts
 * const imports = importsFrom({
 *   "nexus": ["foo", "bar"],
 *   "amet": ["lorem", "ipsum", "dolor", "sit"],
 * });
 * ```
 *
 * will result in an AST equivalent to
 *
 * ```
 * import { foo, bar } from "baz";
 * import { lorem, ipsum, dolor, sit } from "amet";
 * ```
 *
 * @param imports A record mapping module names to optional arrays of identifiers
 * @returns An array of {@link ImportDeclaration ImportDeclarations}
 */
export function importsFrom(imports: ImportRecord): ImportDeclaration[] {
  return Object.entries(imports).map(([module, identifiers]) =>
    importFrom(module, identifiers),
  );
}

/**
 * Helper function to quickly build a set of imports from a given module.
 * Simply pass the name of the module and an optional array of identifiers
 * into the function and it will return an {@link ImportDeclaration ImportDeclaration}
 * representing the desired set of impor
 *
 * @param module The module to import the identifiers from
 * @param imports An optional {@link ImportTuple}
 * @returns A {@link ImportDeclaration ImportDeclaration}
 */
export function importFrom(
  module: string,
  imports: ImportTuple = [undefined, undefined],
): ImportDeclaration {
  const [defaultImport, namedImports] = imports;

  const defaultImportIdentifier = defaultImport
    ? factory.createIdentifier(defaultImport)
    : undefined;

  const importSpecifiers = namedImports
    ? Object.entries(namedImports).map(([property, name]) => {
        const propertyIdentifier = factory.createIdentifier(property);
        const nameIdentifier = name && factory.createIdentifier(name);
        return nameIdentifier
          ? factory.createImportSpecifier(
              false,
              propertyIdentifier,
              nameIdentifier,
            )
          : factory.createImportSpecifier(false, undefined, propertyIdentifier);
      })
    : undefined;

  const importClause = importSpecifiers
    ? factory.createImportClause(
        false,
        defaultImportIdentifier,
        factory.createNamedImports(importSpecifiers),
      )
    : undefined;

  return factory.createImportDeclaration(
    undefined,
    importClause,
    factory.createStringLiteral(module),
  );
}

/**
 * Helper function to quickly build an `export const ...`
 * statement. Pass identifier and initializer into the functon, and let the magic happen.
 *
 * This function astifies the {@link initializer `initializer`}, so you can simply pass in the object you want
 * to initialize it with instead of astifying it yourself.
 *
 * The {@link type `type`} argument is probably the weakest part of this function. It accepts a type name
 * as a string, which it will turn into literal and build into a type reference.
 * This means it does not support generics or string literal types
 *
 * @example
 * ```ts
 * const ast = exportConst("foo", { bar: "baz" }, "any");
 *
 * const content = astify.print(ast); // "export const foo: any = { bar: "baz" };"
 * ```
 *
 * @param identifier The identifier of the variable
 * @param initializer The value to turn into a literal as the variable initializer
 * @param type An optional type of the variable
 * @returns A variable statement with `export` modifier and `const` flag
 */
export function exportConst(
  identifier: string,
  initializer: unknown,
  type?: string | TypeNode,
): VariableStatement {
  const typeNode = type
    ? (() => {
        if (typeof type === "string") {
          return factory.createTypeReferenceNode(
            factory.createIdentifier(type),
          );
        } else {
          return type;
        }
      })()
    : undefined;

  return factory.createVariableStatement(
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(identifier),
          undefined,
          typeNode,
          literal(initializer),
        ),
      ],
      NodeFlags.Const,
    ),
  );
}

/**
 * Utility function to quickly print an array of statements to a string.
 * Usually, printing TS nodes involves creating a {@link Printer printer} and
 * a {@link SourceFile source file}, then printing that source file using the printer.
 * This function exists in order to make printing the one-liner it should be.
 *
 * @param statements An array of {@link Statement Statements} to print
 * @returns The printed contents of a {@link SourceFile SourceFile} containing the {@link statements}
 */
export function printSourceFile(statements: Statement[]): string {
  const source = factory.createSourceFile(
    statements,
    factory.createToken(SyntaxKind.EndOfFileToken),
    NodeFlags.None,
  );

  return printer
    .printFile(source)
    .replace(/\\u([\d\w]{4})/gi, (_: string, g: string) =>
      String.fromCharCode(parseInt(g, 16)),
    );
}

/**
 * Utility function extending the {@link printSourceFile} functionality by enabling you to
 * write a set of {@link Statement statements} directly to a file of your choice.
 * The function will accept both, absolute and relative paths.
 *
 * If the target file exists already, the function will emit a warning, then proceed
 * to overwrite the file, so make sure the target path is correct.
 *
 * @param statements An array of {@link Statement Statements} to write
 * @param file The name of the file to write the statements to
 */
export async function writeSourceFile(
  statements: Statement[],
  file: string,
): Promise<void> {
  const absolute = path.isAbsolute(file) ? file : path.resolve(file);

  if (fs.existsSync(absolute)) {
    const stats = fs.statSync(absolute);

    if (stats.isDirectory()) {
      throw new Error(`Target ${absolute} exists and is a directory`);
    }

    if (!stats.isFile()) {
      throw new Error(`Target ${absolute} exists and is not a file`);
    }

    console.warn(`Warning, overwriting existing file ${absolute}`);
  }

  const content = printSourceFile(statements);

  const config = await prettier.resolveConfig(absolute, {
    editorconfig: true,
  });

  const options: Options = { ...config, filepath: absolute };

  const formatted = await prettier.format(content, options);

  const eslint = new ESLint({
    fix: true,
  });

  const lintResults = await eslint.lintText(formatted);
  await ESLint.outputFixes(lintResults);

  const formattedContent = lintResults[0]?.output ?? formatted;

  console.log(`formattedContent`, formattedContent);

  if (formattedContent) {
    fs.writeFileSync(absolute, formattedContent);
  }
}

export default {
  array,
  object,
  property,
  literal,
};
