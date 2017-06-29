import * as mongoose from 'mongoose';
import { config } from '../../config';
import { User } from './models';


export { mongoose };

export class Db {

  public static get User() {
    return User;
  }

  public connection = mongoose.connection;

  public init() {
    (mongoose as any).Promise = global.Promise;
    mongoose.connect(config.mongoose.host, config.mongoose.options);
  }

}
