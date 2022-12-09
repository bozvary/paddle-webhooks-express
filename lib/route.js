/**
 * IMPORTS
 */

var express = require('express');
var router = express.Router();

var validator = require('./validator');
var WebhooksManager = require('./WebhooksManager')

router.use(validator.validate());

router.post('/webhook', function(req, res){
  
  /* TODO: implement each webhook alertType */
  if (req.body.alert_name == 'subscription_payment_succeeded') {
    new WebhooksManager().subscription_payment_succeeded(req.body)
  }else if (req.body.alert_name == 'subscription_created') {
    new WebhooksManager().subscription_created(req.body)
  }

  res.json({
    message: 'Validation was successful'
  });

});

/**
 * Expose `router`.
 */

module.exports = router;

