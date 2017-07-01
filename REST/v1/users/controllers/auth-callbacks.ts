import { Request, Response } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { AuthenticateOptions, authenticate } from 'passport';
import { User } from '../../../../libs/db/models';


const authCallbackOptions: AuthenticateOptions = {
  session: false
  // failureRedirect: '/'
};

/**
 *
 * @param req
 * @param res
 */
const authCallback = ( req: Request, res: Response ) => {
  User.generateJwt(req.user)
    .then(( token ) => {
      return res.json({
        jwt: token,
        user: {
          username: req.user.username
        }
      });
    });
};

/**
 *
 * @returns {[express.Handler]}
 */
export const authGoogle = (): RequestHandlerParams => {
  return [
    authenticate('google', { scope: [ 'profile', 'email' ] })
  ];
};

/**
 *
 * @returns {[express.Handler]}
 */
export const authFacebook = (): RequestHandlerParams => {
  return [
    authenticate('facebook', { scope: [ 'public_profile', 'email' ] })
  ];
};

/**
 *
 * @returns {[express.Handler]}
 */
export const authTwitter = (): RequestHandlerParams => {
  return [
    authenticate('twitter')
  ];
};

/**
 *
 * @returns {[express.Handler]}
 */
export const authVkontakte = (): RequestHandlerParams => {
  return [
    authenticate('vkontakte')
  ];
};

/**
 *
 * @returns {[express.Handler]}
 */
export const authGoogleCallback = (): RequestHandlerParams => {
  return [
    authenticate('google', authCallbackOptions),
    authCallback
  ];
};

/**
 *
 * @returns {[express.Handler]}
 */
export const authFacebookCallback = (): RequestHandlerParams => {
  return [
    authenticate('facebook', authCallbackOptions),
    authCallback
  ];
};

/**
 *
 * @returns {[express.Handler]}
 */
export const authTwitterCallback = (): RequestHandlerParams => {
  return [
    authenticate('twitter', authCallbackOptions),
    authCallback
  ];
};

/**
 *
 * @returns {[express.Handler]}
 */
export const authVkontakteCallback = (): RequestHandlerParams => {
  return [
    authenticate('vkontakte', authCallbackOptions),
    authCallback
  ];
};
