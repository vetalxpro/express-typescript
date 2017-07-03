import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from '../../db/models';


const strategyOptions: IStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password'
};

/**
 *
 * @type {Strategy}
 */
export const localStrategy = new Strategy(strategyOptions, async ( email, password, done ) => {

    try {
      const user = await User.findByEmail(email).select('+password');
      if ( !user ) {
        return done(null, false, { message: 'User not found' });
      }
      const passwordsMatch = await user.checkPassword(password);
      if ( !passwordsMatch ) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);

    } catch ( err ) {
      done(err);
    }
  }
);
