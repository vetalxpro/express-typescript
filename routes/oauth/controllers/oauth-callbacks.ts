import { Request, Response } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { authenticate, AuthenticateOptions } from 'passport';
import { User } from '../../../libs/db/models';


const authOptions: AuthenticateOptions = {
  session: false
  // failureRedirect: '/'
};

/**
 *
 * @param req
 * @param res
 */
const oauthCallbackHandler = ( req: Request, res: Response ) => {
  User.generateJwt(req.user)
    .then(( token ) => {
      return res.render('popup-response', {
        response: {
          jwt: token,
          user: {
            username: req.user.username
          }
        }
      });
    });
};


/**
 *
 * @returns {[express.Handler]}
 */
export const oauthGoogleCallback = (): RequestHandlerParams => {
  return [
    authenticate('google', authOptions),
    oauthCallbackHandler
  ];
};

/**
 *
 * @returns {[express.Handler]}
 */
export const oauthFacebookCallback = (): RequestHandlerParams => {
  return [
    authenticate('facebook', authOptions),
    oauthCallbackHandler
  ];
};

/**
 *
 * @returns {[express.Handler]}
 */
export const oauthTwitterCallback = (): RequestHandlerParams => {
  return [
    authenticate('twitter', authOptions),
    oauthCallbackHandler
  ];
};

/**
 *
 * @returns {[express.Handler]}
 */
export const oauthVkontakteCallback = (): RequestHandlerParams => {
  return [
    authenticate('vkontakte', authOptions),
    oauthCallbackHandler
  ];
};
