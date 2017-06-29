import { User } from '../db/models';
import { Strategy, IStrategyOptions } from 'passport-local';


const localStrategyOptions: IStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password'
};

export const localStrategy = new Strategy(localStrategyOptions, ( email, password, done ) => {
    User.findByEmail(email)
      .select('+password')
      .then(( user ) => {
        if ( !user ) {
          done(null, false, { message: 'User not found' });
          return null;
        }
        return User.checkPassword(password, user.local.password)
          .then(( isMatch ) => {
            if ( !isMatch ) {
              done(null, false, { message: 'Invalid password' });
              return null;
            }
            done(null, user);
            return null;
          });
      })
      .catch(done);
  }
);
