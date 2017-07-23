import { json, urlencoded } from 'body-parser';
import * as connectMongo from 'connect-mongo';
import * as express from 'express';
import { Request, Response } from 'express';
import { validateMax } from 'express-content-length-validator';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import { merge } from 'lodash';
import * as morgan from 'morgan';
import { notify } from 'node-notifier';
import { join } from 'path';
import * as favicon from 'serve-favicon';

import { config } from './config';
import { Db } from './libs/db';
import { logger } from './libs/logger';
import { passport } from './libs/passport';
import { simpleLogger, urlNotFound } from './middleware';
import { restRoutes } from './REST';
import { routes } from './routes';
import flash = require('connect-flash');


const MongoStore: connectMongo.MongoStoreFactory = connectMongo(session);

export class ExpressApp {
  public app: express.Application;
  public db: Db;

  constructor( db: Db ) {
    this.db = db;
    this.app = express();
  }

  public init() {
    this.config();
    this.initMiddlewares();
    this.initRest();
    this.initRoutes();
    this.initErrorHandlers();
    return this.app;
  }

  private config() {
    this.app.enable('trust proxy');
    this.app.set('view engine', 'pug');
    this.app.set('views', join(__dirname, './views'));
    this.app.locals.startTime = Date.now();
  }

  private initMiddlewares() {
    this.app.use(morgan('dev'));
    this.app.use(favicon(join(__dirname, './public/assets/favicon.ico')));
    this.app.use(validateMax(config.server.contentLengthOptions));
    this.app.use(helmet(config.helmetOptions));
    this.app.use(session(merge(true, config.sessionOptions, {
      store: new MongoStore({ mongooseConnection: this.db.connection })
    })));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(express.static(join(__dirname, './public')));
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(hpp({ checkBody: false }));
    this.app.use(flash());
    this.app.use(simpleLogger);
  }

  private initRest() {
    this.app.use('/', restRoutes.init());
  }

  private initRoutes() {
    this.app.use('/', routes.init());
  }

  private initErrorHandlers() {
    this.app.use(urlNotFound);
    this.app.use(( err, req: Request, res: Response, next ) => {

      res.locals.message = err.message;
      if ( err.name === 'ValidationError' ) {
        err.status = 400;
      }
      res.status(err.status || 500);

      logger.error(err.status, err);

      if ( req.app.get('env') === 'development' ) {
        res.locals.error = err;
        /*notify({
          title: err.status,
          message: err.message,
          sound: true
        });*/
      } else {
        res.locals.error = {};
      }
      if ( /application\/json/.test(req.header('accept')) ) {
        res.setHeader('Content-Type', 'application/json');
        return res.json({
          status: err.status,
          message: res.locals.message
        });
      }
      return res.render('error');
    });

  }
}
