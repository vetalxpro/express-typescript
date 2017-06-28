import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import { merge } from 'lodash';
import { config } from '../../config';


export class Db {
  public connection = mongoose.connection;

  public init() {
    mongoose.connect(config.mongoose.host, this.makeOptions());
  }

  private makeOptions(): mongoose.ConnectionOptions {
    const options: mongoose.ConnectionOptions = {
      promiseLibrary: bluebird
    };
    return merge(config.mongoose.options, options);
  }
}

export const db = new Db();
