import { User } from '../db/models';
import { IStrategyOptions, Strategy } from 'passport-vkontakte';
import { config } from '../../config';

const strategyOptions: IStrategyOptions = config.passport.vkontakteAuthOptions;

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
        done(null, user.toObject());
        return null;
      })
      .catch(done);
  }
);
