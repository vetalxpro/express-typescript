import { User } from '../db/models';
import { config } from '../../config';

const { Strategy } = require('passport-google-oauth20');

export const googleStrategy = new Strategy(
  config.passport.googleAuthOptions,
  ( accessToken, refreshToken, profile, cb ) => {
    User.updateOrCreate(
      { 'google.id': profile.id },
      {
        'google.token': accessToken,
        'google.name': profile.displayName,
        'google.email': profile.emails[ 0 ].value
      })
      .then(( user ) => {
        cb(null, user);
      })
      .catch(cb);
  }
);
