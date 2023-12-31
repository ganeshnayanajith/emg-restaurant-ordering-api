const pino = require('pino');

module.exports = pino({
  level: process.env.PINO_LOG_LEVEL || 'trace',
  timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
});
