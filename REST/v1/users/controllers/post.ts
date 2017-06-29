import { Request, Response } from 'express';
import { IUser, User } from '../../../../libs/db/models';
import { HttpError } from '../../../../libs/errors';
import { sign } from 'jsonwebtoken';
import { omit } from 'lodash';
import { config } from '../../../../config';


/**
 *
 * @param req
 * @param res
 * @param next
 */
export const registerUser = ( req: Request, res: Response, next ) => {
  const newUser = {
    local: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
  };
  User.createUser(newUser)
    .then(( user ) => {
      res.status(201).json(user);
    })
    .catch(next);
};


/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {any}
 */
export const loginUser = ( req: Request, res: Response, next ) => {
  const { email, password } = req.body;
  if ( !email || !password ) {
    return next(new HttpError(400, 'Empty email or password'));
  }
  User.findByEmail(email)
    .select('+local.password')
    .lean()
    .then(( user: IUser ) => {
      if ( !user ) {
        return next(new HttpError(404, 'User not found'));
      }
      return User.checkPassword(password, user.local.password)
        .then(( isMatch ) => {
          if ( !isMatch ) {
            return next(new HttpError(403, 'Incorrect Password'));
          }
          user.local = omit(user.local, [ 'password' ]);

          sign(user, config.jwt.secret, config.jwt.options, ( err, token ) => {
            if ( err ) {
              return next(err);
            }
            return res.json({
              jwt: token,
              user
            });
          });
        });
    }).catch(next);
};
