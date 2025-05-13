import * as React from 'react';

import { FlexibleRazorPayViewProps } from './FlexibleRazorPay.types';

export default function FlexibleRazorPayView(props: FlexibleRazorPayViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
