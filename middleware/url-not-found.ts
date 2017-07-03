import { Request, Response } from 'express';
import { HttpError } from '../libs/errors';

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {any}
 */
export const urlNotFound = ( req: Request, res: Response, next ) => {
  return next(new HttpError(404));
};
