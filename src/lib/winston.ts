import winston from 'winston';
const { combine, timestamp, printf, cli } = winston.format;

/**
 * Cache the logger in development. This avoids creating a new logger on every HMR
 * update.
 */
const globalForLogger = globalThis as unknown as {
  logger: winston.Logger | undefined;
};

export const logger =
globalForLogger.logger ?? winston.createLogger({
    level: 'info',
    format: combine(
      cli(),
      timestamp(),
      printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
      new winston.transports.Console(),
    ]
  });