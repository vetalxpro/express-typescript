import { IStrategyOption, Strategy } from 'passport-facebook';
import { config } from '../../config';
import { User } from '../db/models';


const strategyOptions: IStrategyOption = config.passport.facebookAuthOptions;

export const facebookStrategy = new Strategy(strategyOptions, ( accessToken, refreshToken, profile, cb ) => {
    User.findOrCreate({ 'facebook.id': profile.id },
      {
        username: profile.displayName,
        facebook: {
          id: profile.id,
          accessToken: accessToken,
          displayName: profile.displayName
        }
      })
      .then(( user ) => {
        cb(null, user);
        return null;
      })
      .catch(cb);
  }
);
