import { IStrategyOptions, Strategy } from 'passport-vkontakte';
import { config } from '../../../config';
import { User } from '../../db/models';


const strategyOptions: IStrategyOptions = {
  clientID: config.passport.vkontakteAuthOptions.clientID,
  clientSecret: config.passport.vkontakteAuthOptions.clientSecret,
  callbackURL: `${config.server.callbackUrl}/oauth/vkontakte/callback`
};

/**
 *
 * @type {"passport-vkontakte".Strategy}
 */
export const vkontakteStrategy = new Strategy(strategyOptions, async ( accessToken, refreshToken, profile, done ) => {

    try {
      const data = {
        username: profile.displayName,
        vkontakte: {
          id: profile.id,
          accessToken: accessToken,
          displayName: profile.displayName
        }
      };
      const user = await User.findOrCreate({ 'vkontakte.id': profile.id }, data);
      return done(null, user);

    } catch ( err ) {
      done(err);
    }
  }
);
