import { User } from '../db/models';
import { config } from '../../config';

import { OAuth2Strategy, IOAuth2StrategyOption } from 'passport-google-oauth';

const strategyOptions: IOAuth2StrategyOption = config.passport.googleAuthOptions;

export const googleStrategy = new OAuth2Strategy(strategyOptions, ( accessToken, refreshToken, profile, done ) => {
    User.findOrCreate({ 'google.id': profile.id },
      {
        username: profile.displayName,
        google: {
          id: profile.id,
          accessToken: accessToken,
          displayName: profile.displayName
        }
      })
      .then(( user ) => {
        done(null, user.toObject());
        return null;
      })
      .catch(done);
  }
);
