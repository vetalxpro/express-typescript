import * as passport from 'passport';
import { IUser, User } from '../db/models';
import {
  facebookStrategy,
  googleStrategy,
  jwtStrategy,
  localStrategy,
  twitterStrategy,
  vkontakteStrategy
} from './strategies';


passport.serializeUser(( user: IUser, done ) => {
  done(null, user._id);
});

passport.deserializeUser(( id: string, done ) => {
  User.findById(id)
    .then(( user ) => {
      if ( user ) {
        done(null, user);
        return null;
      }
    })
    .catch(done);
});

passport.use(localStrategy);
passport.use(jwtStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);
passport.use(twitterStrategy);
passport.use(vkontakteStrategy);

export { passport };
