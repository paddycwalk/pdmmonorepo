declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.enums.ts" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const value: import("next/image").StaticImageData;
  export default value;
}
