import { NativeModule, requireNativeModule } from 'expo';

import { FlexibleRazorPayModuleEvents } from './FlexibleRazorPay.types';

declare class FlexibleRazorPayModule extends NativeModule<FlexibleRazorPayModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<FlexibleRazorPayModule>('FlexibleRazorPay');
