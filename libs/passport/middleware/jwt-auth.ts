import { Request, Response } from 'express';
import { authenticate, AuthenticateOptions } from 'passport';
import { HttpError } from '../../errors';


const authJwtOptions: AuthenticateOptions = {
  session: false
};

/**
 * Passport JWT middleware
 * @param req
 * @param res
 * @param next
 */
export const jwtAuth = ( req: Request, res: Response, next ) => {
  authenticate('jwt', authJwtOptions, ( err, user, info ) => {
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
