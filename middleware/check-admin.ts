import { Request, Response } from 'express';
import { HttpError } from '../libs/errors';
/**
 * Check Admin middleware (from req.user)
 * Passport itself set req.user after auth strategy
 * This middleware must be setted after passport auth strategy
 */

export const checkAdmin = ( req: Request, res: Response, next ) => {
  if ( req.user && req.user.role && req.user.role.indexOf('admin') > -1 ) {
    return next();
  }
  return next(new HttpError(403, 'Access Denied'));
};
