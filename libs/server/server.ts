import { createServer, Server } from 'http';
import { Application } from 'express';
import { config } from '../../config';
import { logger } from '../logger';
import { Db } from '../db';


export class AppServer {
  private server: Server;
  private app: Application;
  private db: any;

  constructor( app: Application, db: Db ) {
    this.app = app;
    this.db = db;
  }

  public start() {
    this.config();
    this.db.connection.on('open', ( err ) => {
      if ( err ) {
        throw err;
      }
      this.server.listen(config.server.port);
    });
  }

  private config() {
    this.db.init();
    this.app.set('port', config.server.port);
    this.server = createServer(this.app);
    this.server.on('error', this.onError);
    this.server.on('listening', this.onListening);
  }

  private onListening() {
    logger.info(`Server started on ${config.server.port}`);
  }

  private onError( error: NodeJS.ErrnoException ) {
    if ( error.syscall !== 'listen' ) {
      throw error;
    }

    switch ( error.code ) {
      case 'EACCES':
        logger.error(config.server.port + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(config.server.port + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}
