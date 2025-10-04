declare module '@prisma/extension-optimize' {
  // Minimal typings for the Optimize extension. Adjust if you install
  // a more specific types package in the future.
  export type WithOptimizeOptions = { apiKey?: string };
  export function withOptimize(opts?: WithOptimizeOptions): any;
  export default withOptimize;
}
