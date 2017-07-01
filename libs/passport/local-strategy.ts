import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from '../db/models';


const strategyOptions: IStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password'
};

export const localStrategy = new Strategy(strategyOptions, ( email, password, done ) => {
    User.findByEmail(email)
      .select('+password')
      .then(( user ) => {
        if ( !user ) {
          done(null, false, { message: 'User not found' });
          return null;
        }
        return User.checkPassword(password, user.password)
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
