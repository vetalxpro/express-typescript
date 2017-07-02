import { RequestHandlerParams } from 'express-serve-static-core';
import { authenticate } from 'passport';


/**
 *
 * @returns {[express.Handler]}
 */
export const oauthGoogle = (): RequestHandlerParams => {
  return [
    authenticate('google', { scope: [ 'profile', 'email' ] })
  ];
};

/**
 *
 * @returns {[express.Handler]}
 */
export const oauthFacebook = (): RequestHandlerParams => {
  return [
    authenticate('facebook', { scope: [ 'public_profile', 'email' ] })
  ];
};

/**
 *
 * @returns {[express.Handler]}
 */
export const oauthTwitter = (): RequestHandlerParams => {
  return [
    authenticate('twitter')
  ];
};

/**
 *
 * @returns {[express.Handler]}
 */
export const oauthVkontakte = (): RequestHandlerParams => {
  return [
    authenticate('vkontakte')
  ];
};
