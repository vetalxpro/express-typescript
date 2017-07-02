import { ExpressApp } from './app';
import { config } from './config';
import { AppServer, WebSocketApp } from './libs';
import { Db } from './libs/db';
import { logger } from './libs/logger';


const db = new Db();
db.init();

export const appServer = new AppServer(new ExpressApp(db), new WebSocketApp());

db.connection.once('open', ( err ) => {
  if ( err ) {
    throw err;
  }
  logger.info(`Mongoose connected to ${config.mongoose.host}`);
  appServer.start();
});
