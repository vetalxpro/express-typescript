import { User } from '../../db/models';
import { config } from '../../../config';
import { Strategy, IStrategyOption } from 'passport-twitter';


const strategyOptions: IStrategyOption = {
  consumerKey: config.passport.twitterAuthOptions.consumerKey,
  consumerSecret: config.passport.twitterAuthOptions.consumerSecret,
  callbackURL: `${config.server.callbackUrl}/oauth/twitter/callback`
};

export const twitterStrategy = new Strategy(strategyOptions, ( accessToken, refreshToken, profile, done ) => {
    User.findOrCreate({ 'twitter.id': profile.id },
      {
        username: profile.displayName,
        twitter: {
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
