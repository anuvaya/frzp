import { requireNativeView } from 'expo';
import * as React from 'react';

import { FlexibleRazorPayViewProps } from './FlexibleRazorPay.types';

const NativeView: React.ComponentType<FlexibleRazorPayViewProps> =
  requireNativeView('FlexibleRazorPay');

export default function FlexibleRazorPayView(props: FlexibleRazorPayViewProps) {
  return <NativeView {...props} />;
}
