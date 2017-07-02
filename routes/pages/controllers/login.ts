import { Request, Response } from 'express';
import { localAuth } from '../../../libs/passport/middleware';

export const showLoginPage = () => {
  const handler = ( req: Request, res: Response ) => {
    if ( req.isAuthenticated() ) {
      return res.redirect('/dashboard');
    }
    return res.render('login', { title: 'Login', message: { type: 'error', text: req.flash('error') } });
  };

  return [
    handler
  ];
};


export const postLogin = () => localAuth;
