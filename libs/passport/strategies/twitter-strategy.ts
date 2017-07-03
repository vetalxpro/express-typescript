import { User } from '../../db/models';
import { config } from '../../../config';
import { Strategy, IStrategyOption } from 'passport-twitter';


const strategyOptions: IStrategyOption = {
  consumerKey: config.passport.twitterAuthOptions.consumerKey,
  consumerSecret: config.passport.twitterAuthOptions.consumerSecret,
  callbackURL: `${config.server.callbackUrl}/oauth/twitter/callback`
};

/**
 *
 * @type {Strategy}
 */
export const twitterStrategy = new Strategy(strategyOptions, async ( accessToken, refreshToken, profile, done ) => {

    try {
      const data = {
        username: profile.displayName,
        twitter: {
          id: profile.id,
          accessToken: accessToken,
          displayName: profile.displayName
        }
      };
      const user = await User.findOrCreate({ 'twitter.id': profile.id }, data);
      return done(null, user);

    } catch ( err ) {
      done(err);
    }
  }
);
