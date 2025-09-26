const morgan = require('morgan');

// Logger HTTP (usado em app.js)
const httpLogger = morgan('combined');

// Logger interno simples
const log = {
  info: (...args) => console.log('[INFO]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
  warn: (...args) => console.warn('[WARN]', ...args)
};

module.exports = { httpLogger, log };
