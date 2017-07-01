import { User } from '../db/models';
import { config } from '../../config';
import { Strategy, IStrategyOption } from 'passport-twitter';


const strategyOptions: IStrategyOption = config.passport.twitterAuthOptions;

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
        done(null, user.toObject());
        return null;
      })
      .catch(done);
  }
);
