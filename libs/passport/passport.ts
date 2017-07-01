import * as passport from 'passport';
import { IUser, User } from '../db/models';
import { facebookStrategy } from './facebook-strategy';
import { googleStrategy } from './google-strategy';
import { jwtStrategy } from './jwt-strategy';
import { localStrategy } from './local-strategy';
import { twitterStrategy } from './twitter-strategy';
import { vkontakteStrategy } from './vkontakte-strategy';


passport.serializeUser(( user: IUser, done ) => {
  console.log(1);
  done(null, user._id);
});

passport.deserializeUser(( id: string, done ) => {
  console.log(2);
  User.findById(id)
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
passport.use(facebookStrategy);
passport.use(twitterStrategy);
passport.use(vkontakteStrategy);

export { passport };
