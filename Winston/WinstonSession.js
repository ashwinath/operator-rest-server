const winston = require('winston'),
      path = require('path');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: function() {
        const now     = new Date(),
              date    = padDigits(now.getDate()),
              month   = padDigits(now.getMonth()),
              year    = padDigits(now.getFullYear()),
              hours   = padDigits(now.getHours()),
              minutes = padDigits(now.getMinutes()),
              seconds = padDigits(now.getSeconds());

        return `${date}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      },
      formatter: function(options) {
        return `[${options.timestamp()}]`
          + `[${options.level.toUpperCase()}]`
          + `[${(options.message ? options.message : '')}]`
          +`${(options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' )}`;
      }
    })
  ]
});

function padDigits(number) {
  return (number < 10 ? '0' : '') + number;
}

module.exports = logger;
