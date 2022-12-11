const alertTypes = [
  require('./alertTypes/high_risk_transaction_created'),
  require('./alertTypes/high_risk_transaction_updated'),
  require('./alertTypes/locker_processed'),
  require('./alertTypes/new_audience_member'),
  require('./alertTypes/payment_dispute_closed'),
  require('./alertTypes/payment_dispute_created'),
  require('./alertTypes/payment_refunded'),
  require('./alertTypes/payment_succeeded'),
  require('./alertTypes/subscription_cancelled'),
  require('./alertTypes/subscription_created'),
  require('./alertTypes/subscription_payment_failed'),
  require('./alertTypes/subscription_payment_refunded'),
  require('./alertTypes/subscription_payment_succeeded'),
  require('./alertTypes/subscription_updated'),
  require('./alertTypes/transfer_created'),
  require('./alertTypes/transfer_paid'),
  require('./alertTypes/update_audience_member')
]

function validate(payload){
  return (req, _, next) => {
    try {
      const { body } = req
      const alertName = body?.alert_name
      if (!alertName) {
        /* TODO: Store the payload in file or somewhere, to check and to be able to replicate the wrong request format*/
        console.error(`Could not find the alert_name attribute in the request`)
        next('Could not find the alert_name attribute in the request')
        return false
      }

      /* TODO: implement some validation */
      const alertType = alertTypes.find(alertType => alertType.alert_name?.default === alertName)

      /* 
        TODO: 
          implement 'p_signature' validation https://developer.paddle.com/webhook-reference/ZG9jOjI1MzUzOTg2-verifying-webhooks
      */

      if (!alertType) {
        /* TODO: Store the payload in file or somewhere, to check and to be able to replicate the wrong request format*/
        console.error(`Could not find this alertType for alert with '${alertName}'.`)
        console.error(`In case you need validation support for this hook please open an issue https://github.com/bozvary/paddle-webhooks-express/issues or create a PR at https://github.com/bozvary/paddle-webhooks-express.`)
        next(`Could not find this alertType for alert with '${alertName}'.`)
        return false
      }else{
        next()
        return
      }

    } catch (err) {
        /* TODO: Store the payload in file or somewhere, to check and to be able to replicate the wrong request format*/
        console.error('catch')
        next('catch', err)
    }

    next('Something went wrong')
  }
}

/**
 * Expose `validate`.
 */

module.exports.validate = validate

