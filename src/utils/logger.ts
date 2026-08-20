import winston from 'winston';
import { consoleFormat } from 'winston-console-format';

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.padLevels(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    consoleFormat({
      showMeta: true,
      metaStrip: ['service'],
      inspectOptions: {
        depth: Infinity,
        colors: true,
        maxArrayLength: Infinity,
        breakLength: 120,
        compact: Infinity,
      },
    }),
  ),
});

export default logger;
