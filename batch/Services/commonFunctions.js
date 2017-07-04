const logger = require('../../Winston/WinstonSession');

function handleError(message, err) {
  logger.error(message, err);
}

module.exports = {
  handleError: handleError
}
