import { User } from '../db/models';
import { config } from '../../config';

const { Strategy } = require('passport-facebook');

export const facebookStrategy = new Strategy(
  config.passport.facebookAuthOptions,
  ( accessToken, refreshToken, profile, cb ) => {
    User.updateOrCreate(
      { 'facebook.id': profile.id },
      {
        'facebook.token': accessToken,
        'facebook.name': profile.displayName
        // 'facebook.email': profile.emails[0].value
      })
      .then(( user ) => {
        cb(null, user);
      })
      .catch(cb);
  }
);
