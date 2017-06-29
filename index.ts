import * as Bluebird from 'bluebird';
import { AppServer } from './libs';
import { ExpressApp } from './app';
import { Db, WebSocketApp } from './libs';

global.Promise = Bluebird;

export const appServer = new AppServer(new ExpressApp(), new Db(), new WebSocketApp());
appServer.start();
