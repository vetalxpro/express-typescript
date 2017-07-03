import { Server } from 'http';
import * as socketIO from 'socket.io';
import { logger } from '../logger';


export class WebSocketApp {
  private io: SocketIO.Server;

  public init( server: Server ) {
    this.io = socketIO(server);
    this.initConnection();
  }

  private initConnection() {
    this.io.on('connection', ( socket ) => {
      logger.info(`clientID: ${socket.id} connected`);
      socket.broadcast.emit('client connected', `clientID: ${socket.id} connected`);
      this.attachSocketEvents(socket);
    });
  }

  private attachSocketEvents( socket: SocketIO.Socket ) {
    this.disconnectEvent(socket);
  }

  private disconnectEvent( socket: SocketIO.Socket ) {
    socket.on('disconnect', () => {
      this.io.emit('client disconnected', `clientID: ${socket.id} disconnected`);
      logger.info(`clientID: ${socket.id} disconnected`);
    });
  }
}
