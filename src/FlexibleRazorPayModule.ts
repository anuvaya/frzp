import { NativeModule, requireNativeModule } from "expo"

import {
  CheckoutOptions,
  FlexibleRazorPayModuleEvents,
  SuccessResponse,
} from "./FlexibleRazorPay.types"

declare class FlexibleRazorPayModule extends NativeModule<FlexibleRazorPayModuleEvents> {
  open(options: CheckoutOptions): Promise<SuccessResponse>
}

export default requireNativeModule<FlexibleRazorPayModule>("FlexibleRazorPay")
