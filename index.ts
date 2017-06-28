import { AppServer } from './libs';
import { app } from './app';
import { db } from './libs/db';

const appServer = new AppServer(app, db);
appServer.start();
