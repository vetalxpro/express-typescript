import { Request, RequestHandler, Response } from 'express';
import { localAuth } from '../../../libs/passport/middleware';

/**
 *
 * @returns {(req:Request, res:Response)=>(void|void)}
 */
export const showLoginPage = (): RequestHandler => {

  return ( req: Request, res: Response ) => {
    if ( req.isAuthenticated() ) {
      return res.redirect('/dashboard');
    }
    return res.render('login', { title: 'Login', message: { type: 'error', text: req.flash('error') } });
  };

};

export { localAuth as postLogin };
