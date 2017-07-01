import { AppServer } from './libs';
import { ExpressApp } from './app';
import { Db, WebSocketApp } from './libs';


const db = new Db();

export const appServer = new AppServer(new ExpressApp(db), new WebSocketApp());
appServer.start();
