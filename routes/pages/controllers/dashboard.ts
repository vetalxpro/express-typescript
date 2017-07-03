import { Request, RequestHandler, Response } from 'express';
import { isLocalAuth } from '../../../libs/passport/middleware';

/**
 *
 * @returns {[(req:Request, res:Response, next:any)=>any,(req:Request, res:Response)=>void]}
 */
export const showDashboardPage = (): RequestHandler | RequestHandler[] => {
  /**
   *
   * @param req
   * @param res
   */
  const handler = ( req: Request, res: Response ) => {
    return res.render('dashboard', { title: 'Dashboard' });
  };

  return [ isLocalAuth, handler ];
};
