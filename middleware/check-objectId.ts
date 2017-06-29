import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { HttpError } from '../libs/errors';


export const checkObjectId = ( req: Request, res: Response, next ) => {
  const id = req.params.id;
  if ( !Types.ObjectId.isValid(id) ) {
    return next(new HttpError(403, 'Id is invalid'));
  }
  next();
};
