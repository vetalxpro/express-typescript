import { Request, Response } from 'express';
import { authenticate } from 'passport';
import { HttpError } from '../libs';

export const passportJwtAuth = ( req: Request, res: Response, next ) => {
  authenticate('jwt', { session: false }, ( err, user, info ) => {
    if ( err ) {
      return next(err);
    }
    if ( !user ) {
      return next(new HttpError(401, info.message || 'Unauthorized'));
    }
    req.user = user;
    next();
  })(req, res, next);
};
