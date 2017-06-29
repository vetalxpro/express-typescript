import { createServer, Server } from 'http';
import { config } from '../../config';
import { logger } from '../logger';
import { Db } from '../db';
import { ExpressApp } from '../../app';
import { WebSocketApp } from '../socket';


export class AppServer {
  private server: Server;
  private expressApp: ExpressApp;
  private db: Db;
  private websocketApp: WebSocketApp;

  constructor( expressApp: ExpressApp, db: Db, websocketApp: WebSocketApp ) {
    this.db = db;
    this.expressApp = expressApp;
    this.websocketApp = websocketApp;
    this.server = createServer(this.expressApp.app);
  }

  public getServer() {
    return this.server;
  }

  public start() {
    this.config();
    this.db.connection.on('open', ( err ) => {
      if ( err ) {
        throw err;
      }
      logger.info(`Mongoose connected to ${config.mongoose.host}`);
      this.server.listen(config.server.port);
    });
  }

  private config() {
    this.db.init();
    this.expressApp.init();
    if ( config.socket.enable ) {
      this.websocketApp.init(this.server);
    } else {
      this.websocketApp = null;
    }
    this.expressApp.app.set('port', config.server.port);
    this.server.on('error', this.onError);
    this.server.on('listening', this.onListening);
  }

  private onListening() {
    logger.info(`Server started on ${config.server.host}:${config.server.port}`);
  }

  private onError( error: NodeJS.ErrnoException ) {
    if ( error.syscall !== 'listen' ) {
      throw error;
    }

    switch ( error.code ) {
      case 'EACCES':
        logger.error(`${config.server.port} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(`${config.server.port} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}
