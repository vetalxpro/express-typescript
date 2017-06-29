import { User } from '../db/models';
const { Strategy } = require('passport-local');

export const localStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  }, ( email, password, done ) => {
    User.findByEmail(email)
      .select('+password')
      .then(( user ) => {
        if ( !user ) {
          return done(null, false, { message: 'User not found' });
        }
        return User.checkPassword(password, user.local.password)
          .then(( isMatch ) => {
            if ( !isMatch ) {
              return done(null, false, { message: 'Invalid password' });
            }
            return done(null, user);
          });
      })
      .catch(done);
  }
);
