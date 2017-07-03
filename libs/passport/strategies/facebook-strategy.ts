import { IStrategyOption, Strategy } from 'passport-facebook';
import { config } from '../../../config';
import { User } from '../../db/models';


const strategyOptions: IStrategyOption = {
  clientID: config.passport.facebookAuthOptions.clientID,
  clientSecret: config.passport.facebookAuthOptions.clientSecret,
  callbackURL: `${config.server.callbackUrl}/oauth/facebook/callback`
};

export const facebookStrategy = new Strategy(strategyOptions, async ( accessToken, refreshToken, profile, done ) => {

    try {
      const data = {
        username: profile.displayName,
        facebook: {
          id: profile.id,
          accessToken: accessToken,
          displayName: profile.displayName
        }
      };
      const user = await User.findOrCreate({ 'facebook.id': profile.id }, data);
      return done(null, user);

    } catch ( err ) {
      done(err);
    }

  }
);
