import * as mongoose from 'mongoose';
import * as Bluebird from 'bluebird';
import { config } from '../../config';
import { logger } from '../logger';


export { mongoose };

export class Db {
  public connection = mongoose.connection;

  public async init() {
    (mongoose as any).Promise = Bluebird;
    await mongoose.connect(config.mongoose.host, config.mongoose.options);
    logger.info(`Mongoose connected to ${config.mongoose.host}`);
  }
}
