import { User } from '../db/models';
import { config } from '../../config';

import { OAuth2Strategy } from 'passport-google-oauth';

export const googleStrategy = new OAuth2Strategy(config.passport.googleAuthOptions, ( accessToken, refreshToken, profile, done ) => {
    User.updateOrCreate(
      { 'google.id': profile.id },
      {
        'google.id': profile.id,
        'google.token': accessToken,
        'google.name': profile.displayName,
        'google.email': profile.emails[ 0 ].value
      })
      .then(( user ) => {
        done(null, user);
        return null;
      })
      .catch(done);
  }
);
