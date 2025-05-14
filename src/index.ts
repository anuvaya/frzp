// Reexport the native module. On web, it will be resolved to FlexibleRazorPayModule.web.ts
// and on native platforms to FlexibleRazorPayModule.ts
export { default } from "./FlexibleRazorPayModule"
export * from "./FlexibleRazorPay.types"
