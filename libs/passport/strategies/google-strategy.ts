import { User } from '../../db/models';
import { config } from '../../../config';

import { OAuth2Strategy, IOAuth2StrategyOption } from 'passport-google-oauth';

const strategyOptions: IOAuth2StrategyOption = {
  clientID: config.passport.googleAuthOptions.clientID,
  clientSecret: config.passport.googleAuthOptions.clientSecret,
  callbackURL: `${config.server.callbackUrl}/oauth/google/callback`
};

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
        done(null, user);
        return null;
      })
      .catch(done);
  }
);
