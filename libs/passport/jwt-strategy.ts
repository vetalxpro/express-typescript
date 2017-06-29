import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { config } from '../../config';
import { User } from '../db/models';


const passportJwtConfig: StrategyOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

export const jwtStrategy = new Strategy(passportJwtConfig, ( jwtToken, done ) => {
  User.findById(jwtToken._id)
    .select('+role')
    .then(( user ) => {
      if ( !user ) {
        done(null, false, { message: 'User not found' });
        return null;
      }
      done(null, user);
      return null;
    })
    .catch(done);
});
