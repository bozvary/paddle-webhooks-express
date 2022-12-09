/**
 * Module dependencies.
 */
var router = require('./route')
var WebhooksManager = require('./WebhooksManager')

/**
 * Framework version.
 */
require('pkginfo')(module, 'version')

/**
 * Expose constructors.
 */
module.exports.router = router
module.exports.WebhooksManager = WebhooksManager