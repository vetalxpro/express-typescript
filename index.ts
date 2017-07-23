import { ExpressApp } from './app';
import { Db } from './libs/db';
import { AppServer } from './libs/server';
import { WebSocketApp } from './libs/socket';


export const db = new Db();
export const appServer = new AppServer(new ExpressApp(db), new WebSocketApp());

db.init()
  .then(() => {
    appServer.start();
  })
  .catch(( err ) => {
    throw err;
  });
