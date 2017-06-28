import { Logger, LoggerInstance, transports } from 'winston';
import { join } from 'path';
import { config } from '../../config';


const env = config.env;

const logger: LoggerInstance = new Logger();


logger.configure({
  exitOnError: false,
  transports: [
    new transports.Console({
      level: env === 'test' ? 'error' : 'silly',
      colorize: 'all',
      handleExceptions: true,
      humanReadableUnhandledException: true
    }),
    new transports.File({
      name: 'info-file',
      handleExceptions: false,
      filename: join(process.cwd(), './logs/info.log'),
      level: env === 'test' ? 'error' : 'info'
    }),
    new transports.File({
      name: 'error-file',
      filename: join(process.cwd(), './logs/error.log'),
      handleExceptions: true,
      level: 'error',
      humanReadableUnhandledException: true
    })
  ]
});

export { logger };
