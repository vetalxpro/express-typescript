import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { config } from '../../../config';
import { User } from '../../db/models';


const strategyOptions: StrategyOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

/**
 *
 * @type {Strategy}
 */
export const jwtStrategy = new Strategy(strategyOptions, ( decodedToken, done ) => {
  User.findById(decodedToken.id)
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
