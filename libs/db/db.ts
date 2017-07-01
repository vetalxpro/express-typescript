import * as mongoose from 'mongoose';
import * as Bluebird from 'bluebird';
import { config } from '../../config';


export { mongoose };

export class Db {


  public connection = mongoose.connection;

  public init() {
    (mongoose as any).Promise = Bluebird;
    mongoose.connect(config.mongoose.host, config.mongoose.options);
  }

}
