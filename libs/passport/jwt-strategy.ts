import { config } from '../../config';
import { User } from '../db/models';

const { ExtractJwt, Strategy } = require('passport-jwt');


const passportJwtConfig = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

export const jwtStrategy = new Strategy(passportJwtConfig, ( jwt_payload, done ) => {
  User.findById(jwt_payload._id)
    .select('+role')
    .then(( user ) => {
      if ( !user ) {
        return done(null, false, { message: 'User not found' });
      }
      return done(null, user);
    })
    .catch(done);
});
