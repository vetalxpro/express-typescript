import { Request, Response } from 'express';
import { authenticate, AuthenticateOptions } from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { config } from '../../config';
import { User } from '../db/models';
import { HttpError } from '../errors';


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


const authJwtOptions: AuthenticateOptions = {
  session: false
};

/**
 * Passport JWT middleware
 * @param req
 * @param res
 * @param next
 */
export const passportJwtAuth = ( req: Request, res: Response, next ) => {
  authenticate('jwt', authJwtOptions, ( err, user, info ) => {
    if ( err ) {
      return next(err);
    }
    if ( !user ) {
      return next(new HttpError(401, info.message || 'Unauthorized'));
    }
    req.user = user;
    next();
  })(req, res, next);
};
