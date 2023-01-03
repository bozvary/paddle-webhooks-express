/**
 * IMPORTS
 */

var express = require('express');
var router = express.Router();

var validator = require('./validator');
var WebhooksManager = require('./WebhooksManager')

router.use(validator.validate());

/*
 * URLs for receiving webhooks
 * You can add up to 5 endpoints to receive the events you've subscribed to.
 * NOTE: Only the primary endpoint receives fields deemed to be sensitive, such as the subscription cancel URL.
 * Check your subscribed events in your Seller Dashboard
 * https://sandbox-vendors.paddle.com/alerts-webhooks
 * https://vendors.paddle.com/alerts-webhooks
 * All platform events that you are subscribed to are sent to all of the URL endpoints that you have defined, but we will only send sensitive fields to your primary endpoint. 
 * This prevents any third party integrations you may be using from having access to data that they may misuse.
 * Sensitive Fields: cancel_url, update_url
 * Check the log of fulfillment and alert webhooks sent from your account by going to Developer Tools > Events > Notification History
 * https://sandbox-vendors.paddle.com/webhook/alerts
 * https://vendors.paddle.com/webhook/alerts
 * Currently, 17 events supported by Paddle.com
 * Method: HTTP POST
 * For webhook events / alerts, the server should respond within 10 seconds with a HTTP 200 status code to indicate the server has successfully received the message. 
 * If Paddle receive anything other than a HTTP 200 (or if there is no response within 10 seconds) Paddle's server will retry the call to the webhook URL every 15 minutes for a maximum of 3 days.
 */
router.post('/webhook', function(req, res){
  /* Idea: You can store the Webhook Payload */
  new WebhooksManager().default(req.body)
  switch (req.body.alert_name) {
  case 'high_risk_transaction_created':
    new WebhooksManager().high_risk_transaction_created(req.body)
    break;
  case 'high_risk_transaction_updated':
    new WebhooksManager().high_risk_transaction_updated(req.body)
    break;
  case 'locker_processed':
    new WebhooksManager().locker_processed(req.body)
    break;
  case 'new_audience_member':
    new WebhooksManager().new_audience_member(req.body)
    break;
  case 'payment_dispute_closed':
    new WebhooksManager().payment_dispute_closed(req.body)
    break;
  case 'payment_dispute_created':
    new WebhooksManager().payment_dispute_created(req.body)
    break;
  case 'payment_refunded':
    new WebhooksManager().payment_refunded(req.body)
    break;
  case 'payment_succeeded':
    new WebhooksManager().payment_succeeded(req.body)
    break;
  case 'subscription_cancelled':
    new WebhooksManager().subscription_cancelled(req.body)
    break;
  case 'subscription_created':
    new WebhooksManager().subscription_created(req.body)
    break;
  case 'subscription_payment_failed':
    new WebhooksManager().subscription_payment_failed(req.body)
    break;
  case 'subscription_payment_refunded':
    new WebhooksManager().subscription_payment_refunded(req.body)
    break;
  case 'subscription_payment_succeeded':
    new WebhooksManager().subscription_payment_succeeded(req.body)
    break;
  case 'subscription_updated':
    new WebhooksManager().subscription_updated(req.body)
    break;
  case 'transfer_created':
    new WebhooksManager().transfer_created(req.body)
    break;
  case 'transfer_paid':
    new WebhooksManager().transfer_paid(req.body)
    break;
  case 'update_audience_member':
    new WebhooksManager().update_audience_member(req.body)
    break;
  default: 
    /* We should not arrive here */
    console.error('Paddle.com Router. We should not arrive here')
    break;
  }

  res.json({
    message: 'Validation was successful'
  });

});

/**
 * Expose `router`.
 */

module.exports = router;

