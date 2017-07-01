import * as express from 'express';
import { Request, Response } from 'express';
import { join } from 'path';
import { json, urlencoded } from 'body-parser';
import { merge } from 'lodash';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as connectMongo from 'connect-mongo';

import { logger, passport } from './libs';
import { pagesRouter } from './routes';
import { config } from './config';
import { simpleLogger, urlNotFound } from './middleware';
import { usersApi, statusApi } from './REST/v1';
import { Db } from './libs/db';


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
    this.db.init();
    this.initMiddlewares();
    this.initApi();
    this.initRoutes();
    this.initErrorHandlers();
    return this.app;
  }

  private config() {
    this.app.set('view engine', 'pug');
    this.app.set('views', join(__dirname, './views'));
    this.app.locals.startTime = Date.now();
  }

  private initMiddlewares() {
    this.app.use(morgan('dev'));
    this.app.use(simpleLogger);
    this.app.use(helmet(config.helmetOptions));
    this.app.use(session(merge(true, config.sessionOptions, {
      store: new MongoStore({ mongooseConnection: this.db.connection })
    })));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(express.static(join(__dirname, './public')));
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private initApi() {
    this.app.use(config.server.apiPath, usersApi);
    this.app.use(config.server.apiPath, statusApi);
  }

  private initRoutes() {
    this.app.use('/', pagesRouter);
    this.app.use(urlNotFound);
  }


  private initErrorHandlers() {

    this.app.use(( err, req: Request, res: Response, next ) => {

      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      if ( err.name === 'ValidationError' ) {
        err.status = 400;
      }
      res.status(err.status || 500);
      if ( err.status !== 500 ) {
        logger.error(err.status, err.message);
      } else {
        logger.error(err);
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
