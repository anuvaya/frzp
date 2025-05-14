import { NativeModule, requireNativeModule } from "expo"

import { FlexibleRazorPayModuleEvents } from "./FlexibleRazorPay.types"

interface CheckoutOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  image?: string
  order_id: string
  prefill?: {
    name?: string
    email?: string
    contact?: string
    method?: "card" | "netbanking" | "wallet" | "emi" | "upi"
  }
  notes?: Record<string | number, string>
  theme?: {
    hide_topbar?: boolean
    color?: string
    backdrop_color?: string
  }
  modal?: {
    backdropclose?: boolean
    escape?: boolean
    handleback?: boolean
    confirm_close?: boolean
    ondismiss?: () => void
    animation?: boolean
  }
  subscription_id?: string
  subscription_card_change?: boolean
  recurring?: boolean
  callback_url?: string
  redirect?: boolean
  customer_id?: string
  timeout?: number
  remember_customer?: boolean
  readonly?: {
    contact?: boolean
    email?: boolean
    name?: boolean
  }
  hidden?: {
    contact?: boolean
    email?: boolean
  }
  send_sms_hash?: boolean
  allow_rotation?: boolean
  retry?: {
    enabled: boolean
    max_count: number
  }
  config?: {
    display: {
      language: "en" | "ben" | "hi" | "mar" | "guj" | "tam" | "tel"
    }
  }
}

declare class FlexibleRazorPayModule extends NativeModule<FlexibleRazorPayModuleEvents> {
  open(options: CheckoutOptions): Promise<void>
}

// This call loads the native module object from the JSI.
export default requireNativeModule<FlexibleRazorPayModule>("FlexibleRazorPay")
