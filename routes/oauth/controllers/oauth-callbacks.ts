import { Request, RequestHandler, Response } from 'express';
import { pick } from 'lodash';
import { authenticate, AuthenticateOptions } from 'passport';
import { IUserDocument } from '../../../libs/db/models';
import { wrapAsync } from '../../../libs/utils';


const authOptions: AuthenticateOptions = {
  session: false
  // failureRedirect: '/'
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const oauthCallbackHandler = async ( req: Request, res: Response ) => {
  const user = req.user as IUserDocument;
  const token = await user.generateJwt();

  return res.render('popup-response', {
    response: {
      jwt: token,
      user: pick(user, [ 'username' ])
    }
  });
};

/**
 *
 * @returns {RequestHandler|RequestHandler[]}
 */
export const oauthGoogleCallback = (): RequestHandler | RequestHandler[] => {

  return wrapAsync([ authenticate('google', authOptions), oauthCallbackHandler ]);
};

/**
 *
 * @returns {RequestHandler|RequestHandler[]}
 */
export const oauthFacebookCallback = (): RequestHandler | RequestHandler[] => {

  return wrapAsync([ authenticate('facebook', authOptions), oauthCallbackHandler ]);
};

/**
 *
 * @returns {express.Handler|RequestHandler[]}
 */
export const oauthTwitterCallback = (): RequestHandler | RequestHandler[] => {

  return wrapAsync([ authenticate('twitter', authOptions), oauthCallbackHandler ]);
};

/**
 *
 * @returns {RequestHandler|RequestHandler[]}
 */
export const oauthVkontakteCallback = (): RequestHandler | RequestHandler[] => {

  return wrapAsync([ authenticate('vkontakte', authOptions), oauthCallbackHandler ]);
};
