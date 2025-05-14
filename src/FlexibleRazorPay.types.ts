import type { StyleProp, ViewStyle } from "react-native"

export type OnLoadEventPayload = {
  url: string
}

export type FlexibleRazorPayModuleEvents = {}

export type ChangeEventPayload = {
  value: string
}

export type FlexibleRazorPayViewProps = {
  url: string
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void
  style?: StyleProp<ViewStyle>
}
