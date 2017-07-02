import { ExpressApp } from './app';
import { AppServer, Db, WebSocketApp } from './libs';


const db = new Db();

export const appServer = new AppServer(new ExpressApp(db), new WebSocketApp());
appServer.start();
