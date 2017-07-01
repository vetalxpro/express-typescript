import { Request, Response } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { pick } from 'lodash';
import { User, defaultUserPickFields } from '../../../../libs/db/models';
import { HttpError } from '../../../../libs/errors';

/**
 * @swagger
 * /users/registration:
 *   post:
 *     summary: Local user registration
 *     operationId: localRegister
 *     tags:
 *     - users
 *     parameters:
 *     - in: body
 *       name: body
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           username:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *         example:
 *           username: 'John'
 *           email: 'john@gmail.com'
 *           password: '123456'
 *     responses:
 *       201:
 *         description: Created
 *         example:
 *           jwt: "dasdsadsas423asd34dsadasdqwe124dasddasdsa"
 *           user:
 *             username: John
 *             email: john@gmail.com
 *       403:
 *         description: Forbidden
 */
export const localRegister = (): RequestHandlerParams => {
  const handler = ( req: Request, res: Response, next ) => {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    let createdUser;

    User.findByEmail(newUser.email)
      .then(( userDoc ) => {
        if ( userDoc ) {
          next(new HttpError(403, `Email ${newUser.email} is already registered`));
          return null;
        }
        return User.createUser(newUser)
          .then(( createdUserDoc ) => {
            createdUser = createdUserDoc;
            return User.generateJwt(createdUserDoc);
          })
          .then(( token ) => {
            return res.json({
              jwt: token,
              user: pick(createdUser, defaultUserPickFields)
            });
          });
      })
      .catch(next);
  };
  return [
    handler
  ];
};

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Local user login
 *     operationId: localRegister
 *     tags:
 *     - users
 *     parameters:
 *     - in: body
 *       name: body
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *         example:
 *           email: 'john@gmail.com'
 *           password: '123456'
 *     responses:
 *       200:
 *         description: OK
 *         example:
 *           jwt: "dasdsadsas423asd34dsadasdqwe124dasddasdsa"
 *           user:
 *             username: 'John'
 *             email: 'john@gmail.com'
 */
export const localLogin = (): RequestHandlerParams => {
  const handler = ( req: Request, res: Response, next ) => {
    const { email, password } = req.body;
    if ( !email || !password ) {
      return next(new HttpError(400, 'Empty email or password'));
    }
    User.findByEmail(email)
      .select('+password')
      .then(( userDoc ) => {
        if ( !userDoc ) {
          return next(new HttpError(404, 'User not found'));
        }
        return User.checkPassword(password, userDoc.password)
          .then(( isMatch ) => {
            if ( !isMatch ) {
              return next(new HttpError(403, 'Incorrect Password'));
            }

            return User.generateJwt(userDoc)
              .then(( token ) => {
                return res.json({
                  jwt: token,
                  user: pick(userDoc.toObject(), defaultUserPickFields)
                });
              });
          });
      })
      .catch(next);
  };

  return [
    handler
  ];
};
