declare module 'express-content-length-validator' {
  import * as express from 'express';

  interface IContentLengthOptions {
    max: number;
    status: number;
    message: string;
  }
  const validateMax: ( options: IContentLengthOptions ) => express.RequestHandler;
}
