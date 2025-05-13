import { registerWebModule, NativeModule } from 'expo';

import { FlexibleRazorPayModuleEvents } from './FlexibleRazorPay.types';

class FlexibleRazorPayModule extends NativeModule<FlexibleRazorPayModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(FlexibleRazorPayModule, 'FlexibleRazorPayModule');
