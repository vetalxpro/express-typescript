import { STATUS_CODES } from 'http';


export class HttpError extends Error {
  public status: number;

  constructor( status: number, message?: string ) {
    super();
    this.status = status;
    this.message = message || STATUS_CODES[ status ];
    Error.captureStackTrace(this, HttpError);
  }
}
