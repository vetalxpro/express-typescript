import { User } from '../../db/models';
import { IStrategyOptions, Strategy } from 'passport-vkontakte';
import { config } from '../../../config';

const strategyOptions: IStrategyOptions = {
  clientID: config.passport.vkontakteAuthOptions.clientID,
  clientSecret: config.passport.vkontakteAuthOptions.clientSecret,
  callbackURL: `${config.server.callbackUrl}/oauth/vkontakte/callback`
};

export const vkontakteStrategy = new Strategy(strategyOptions, ( accessToken, refreshToken, profile, done ) => {
    User.findOrCreate({ 'vkontakte.id': profile.id },
      {
        username: profile.displayName,
        vkontakte: {
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
