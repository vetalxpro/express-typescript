import * as passport from 'passport';
import { IUser, User } from '../db/models';
import { localStrategy } from './local-strategy';
import { jwtStrategy } from './jwt-strategy';
import { googleStrategy } from './google-strategy';


passport.serializeUser(( user, done ) => {
  console.log(1);
  done(null, user);
});

passport.deserializeUser(( userObj: IUser, done ) => {
  console.log(2);
  User.findById(userObj._id)
    .then(( user ) => {
      if ( user ) {
        return done(null, user);
      }
    })
    .catch(done);
});

passport.use(localStrategy);
passport.use(jwtStrategy);
passport.use(googleStrategy);

export { passport };
