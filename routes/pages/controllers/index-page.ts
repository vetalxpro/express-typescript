import { Request, RequestHandler, Response } from 'express';

/**
 *
 * @returns {(req:Request, res:Response)=>void}
 */
export const showIndexPage = (): RequestHandler => {

  return ( req: Request, res: Response ) => {
    return res.render('index', { title: 'Express' });
  };

};
