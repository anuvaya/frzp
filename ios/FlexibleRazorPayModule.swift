import ExpoModulesCore
import Razorpay

public class FlexibleRazorPayModule: Module {
  private var razorpay: RazorpayCheckout?
  private var currentPromise: Promise?

  public func definition() -> ModuleDefinition {
    Name("FlexibleRazorPay")

    AsyncFunction("open") { (options: [String: Any], promise: Promise) in
      openRazorpayCheckout(options: options, promise: promise)
    }
  }

  private func openRazorpayCheckout(options: [String: Any], promise: Promise) {
    self.currentPromise = promise
    DispatchQueue.main.async {
      guard let key = options["key"] as? String else {
        promise.reject(
          NSError(
            domain: "ExpoRazorpay", code: 100,
            userInfo: [NSLocalizedDescriptionKey: "Key is required"])
        )
        return
      }

      self.razorpay = RazorpayCheckout.initWithKey(key, andDelegateWithData: self)

      guard let topVC = UIApplication.shared.windows.first?.rootViewController else {
        promise.reject(
          NSError(
            domain: "FlexibleRazorPayModule", code: 101,
            userInfo: [NSLocalizedDescriptionKey: "Could not get view controller"])
        )
        return
      }
      self.razorpay?.open(options, displayController: topVC)
    }
  }
}

// MARK: - Razorpay Delegate
extension FlexibleRazorPayModule: RazorpayPaymentCompletionProtocolWithData {
  public func onPaymentError(
    _ code: Int32, description str: String, andData response: [AnyHashable: Any]?
  ) {
    var responseDictionary = [String: Any]()
    response?.forEach { key, value in
      if let key = key as? String {
        responseDictionary[key] = value
      }
    }

    responseDictionary["code"] = code
    responseDictionary["description"] = str

    currentPromise?.reject(
      NSError(domain: "ExpoRazorpay", code: Int(code), userInfo: [NSLocalizedDescriptionKey: str])
    )
    currentPromise = nil

  }

  public func onPaymentSuccess(_ payment_id: String, andData response: [AnyHashable: Any]?) {
    var responseDictionary = [String: Any]()
    print(response)
    response?.forEach { key, value in
      if let key = key as? String {
        responseDictionary[key] = value
      }
    }

    responseDictionary["razorpay_payment_id"] = payment_id

    currentPromise?.resolve(responseDictionary)
    currentPromise = nil
  }

}
