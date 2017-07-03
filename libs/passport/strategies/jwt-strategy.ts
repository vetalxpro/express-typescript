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
export const jwtStrategy = new Strategy(strategyOptions, async ( decodedToken, done ) => {

  try {
    const user = await User.findById(decodedToken.id);
    if ( !user ) {
      return done(null, false, { message: 'User not found' });
    }
    return done(null, user);

  } catch ( err ) {
    done(err);
  }
});
