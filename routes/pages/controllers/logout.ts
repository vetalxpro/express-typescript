import { Request, RequestHandler, Response } from 'express';

/**
 *
 * @returns {(req:Request, res:Response)=>void}
 */
export const logout = (): RequestHandler => {

  return ( req: Request, res: Response ) => {
    req.logout();
    return res.redirect('/');
  };
};
