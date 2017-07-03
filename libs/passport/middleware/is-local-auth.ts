import { Request, Response } from 'express';

/**
 * Passport check local auth middleware
 * @param req
 * @param res
 * @param next
 */
export const isLocalAuth = ( req: Request, res: Response, next ) => {
  return req.isAuthenticated() ? next() : res.redirect('/login');
};
