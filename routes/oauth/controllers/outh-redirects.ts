import { authenticate } from 'passport';
import { RequestHandler } from 'express';


/**
 *
 * @returns {[express.Handler]}
 */
export const oauthGoogle = (): RequestHandler => {

  return authenticate('google', { scope: [ 'profile', 'email' ] });
};

/**
 *
 * @returns {[express.Handler]}
 */
export const oauthFacebook = (): RequestHandler => {

  return authenticate('facebook', { scope: [ 'public_profile', 'email' ] });
};

/**
 *
 * @returns {[express.Handler]}
 */
export const oauthTwitter = (): RequestHandler => {

  return authenticate('twitter');
};

/**
 *
 * @returns {[express.Handler]}
 */
export const oauthVkontakte = (): RequestHandler => {

  return authenticate('vkontakte');
};
