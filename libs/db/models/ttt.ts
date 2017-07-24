/*
* id-uuid
* message -string
* send time number
* sender string
* status string
* ttl number
* topic string
*
*
*
*
* */
/*
* create model
* send messages
* read messages with streams
* design with publisher class
* test
*
* */
/*
* 1-запись
* 2 - слушатель
*
*
* */

/*IPublisher

* */

/*
import { EventEmitter } from 'events';

interface IPubCollectionItem {
  event: string;

  cb( err: any, data: any );
}

/!*interface IMongoPub {
  collection: IPubCollectionItem[];

  publish( event: string, data: any, cb?: ( err: any, data: any ) => void );

}

interface IMongoSub {
  subscribe( event: string, cb: ( err: any, data: any ) => void );
}*!/

interface IMongoPubSub {
  subscribe( event: string, cb: ( err: any, data: any ) => void );

  publish( event: string, data: any, cb?: ( err: any, data: any ) => void );
}

class MongoPubSub extends EventEmitter implements IMongoPubSub {
  // private collection: { [event: string]: [] };

  subscribe( event: string, cb: ( err: any, data: any ) => void ) {
    this.on(event, cb);
    return () => {
      this.removeListener(event, cb);
    };
  }

  publish( event: string, data: any, cb?: ( err: any, data: any ) => void ) {
    this.collection[ event ].forEach(( callback ) => {
      callback(1);
    });
  }

}*/
