var format = require('date-format');

const logsEnabled = process.env.LOGS_ENABLED

module.exports = function(message) {

    if(logsEnabled == "true") { console.log('['+format()+']:', message)}

}