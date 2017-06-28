import * as express from 'express';
import { Request, Response } from 'express';
import { join } from 'path';
import { json, urlencoded } from 'body-parser';
import * as morgan from 'morgan';
import * as helmet from 'helmet';

import { logger } from './libs';
import { pagesRouter } from './routes';
import { config } from './config';
import * as swaggerUiPath from 'swagger-ui-dist/absolute-path';
import { simpleLogger, urlNotFound } from './middlewares';
import { usersApi, statusApi } from './REST/api/v1';


class App {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  public init() {
    this.config();
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
    this.app.use('/api-docs', express.static(join(__dirname, './api-docs')));
    this.app.use('/swagger-ui', express.static(swaggerUiPath()));
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

      res.status(err.status || 500);
      if ( err.status !== 404 ) {
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

const app = new App().init();

export { app };
