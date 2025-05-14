package so.vaya.modules.frzp


import android.content.Intent
import android.util.Log
import com.razorpay.PaymentData
import com.razorpay.PaymentResultWithDataListener
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.razorpay.Checkout
import com.razorpay.CheckoutActivity
import com.razorpay.ExternalWalletListener
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.functions.Queues
import org.json.JSONObject

class FlexibleRazorPayModule : Module(), PaymentResultWithDataListener,
    ExternalWalletListener {
    private var pendingPromise: Promise? = null
    private val TAG = "FlexibleRazorPay"

    override fun definition() = ModuleDefinition {
        Name("FlexibleRazorPay")

        OnActivityResult { activity, payload ->
            if (payload.requestCode == Checkout.RZP_REQUEST_CODE) {
                Checkout.handleActivityResult(
                    activity,
                    payload.requestCode,
                    payload.resultCode,
                    payload.data,
                    this@FlexibleRazorPayModule,
                    this@FlexibleRazorPayModule
                )
            }
        }

        AsyncFunction("open") { options: Map<String, Any>, promise: Promise ->
            pendingPromise = promise
            val currentActivity = appContext.currentActivity
            Log.d(TAG, "Opening Razorpay checkout with options: $options")
            try {
                val optionsJSON = JSONObject(options)
                val intent = Intent(currentActivity, CheckoutActivity::class.java)
                intent.putExtra("OPTIONS", optionsJSON.toString());
                intent.putExtra("FRAMEWORK", "react_native");
                appContext.throwingActivity.startActivityForResult(
                    intent,
                    Checkout.RZP_REQUEST_CODE
                );
            } catch (e: Exception) {
                Log.e(TAG, "Error opening Razorpay checkout: ${e.message}", e)
                pendingPromise?.reject(CodedException(e))
                pendingPromise = null
            }
        }.runOnQueue(Queues.MAIN)
    }


    override fun onExternalWalletSelected(p0: String?, p1: PaymentData?) {
        TODO("Not yet implemented")
        print("onExternalWalletSelected")
    }

    override fun onPaymentSuccess(paymentId: String?, response: PaymentData?) {
        val dataJson = response?.data
        Log.d(TAG, "onPaymentSuccess $response")
        val dataMap = mutableMapOf<String, Any>()

        if (paymentId != null) {
            dataMap["razorpay_payment_id"] = paymentId
        }

        if (dataJson != null) {
            try {
                val keys = dataJson.keys()

                while (keys.hasNext()) {
                    val key = keys.next()
                    val value = dataJson.get(key)
                    dataMap[key] = value.toString()
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error parsing payment data: ${e.message}", e)
            }
        }

        pendingPromise?.resolve(dataMap)
        pendingPromise = null
    }

    override fun onPaymentError(code: Int, description: String?, response: PaymentData?) {
        val errorMap = mutableMapOf<String, Any>()
        errorMap["code"] = code
        if (description != null) {
            errorMap["description"] = description
        }

        val dataJson = response?.data
        if (dataJson != null) {
            try {
                val keys = dataJson.keys()

                while (keys.hasNext()) {
                    val key = keys.next()
                    val value = dataJson.get(key)
                    errorMap[key] = value.toString()
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error parsing payment error data: ${e.message}", e)
            }
        }

        pendingPromise?.reject("ERR_RAZORPAY_PAYMENT", description, Exception(description))
        pendingPromise = null
    }

}
