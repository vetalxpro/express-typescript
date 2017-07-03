import { Request, RequestHandler, Response } from 'express';
import { pick } from 'lodash';
import { User } from '../../../../libs/db/models';
import { HttpError } from '../../../../libs/errors';
import { wrapAsync } from '../../../../libs/utils';

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

/**
 *
 * @returns {RequestHandler|RequestHandler[]}
 */
export const localRegister = (): RequestHandler | RequestHandler[] => {
  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<any>}
   */
  const handler = async ( req: Request, res: Response, next ) => {
    const { username, email, password } = req.body;

    const emailExists = await User.findByEmail(email);
    if ( emailExists ) {
      return next(new HttpError(403, `Email ${email} is already registered`));
    }
    const user = await User.createUser({ username, email, password });
    const token = await user.generateJwt();
    return res.json({
      jwt: token,
      user: pick(user, [ 'username', 'email' ])
    });

  };

  return wrapAsync([ handler ]);
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

/**
 *
 * @returns {RequestHandler|RequestHandler[]}
 */
export const localLogin = (): RequestHandler | RequestHandler[] => {
  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<any>}
   */
  const handler = async ( req: Request, res: Response, next ) => {
    const { email, password } = req.body;
    if ( !email || !password ) {
      return next(new HttpError(400, 'Empty email or password'));
    }

    const user = await User.findByEmail(email).select('+password');
    if ( !user ) {
      return next(new HttpError(404, 'User not found'));
    }
    const passwordsMatch = await user.checkPassword(password);
    if ( !passwordsMatch ) {
      return next(new HttpError(403, 'Incorrect Password'));
    }
    const token = await user.generateJwt();
    return res.json({
      jwt: token,
      user: pick(user, [ 'username', 'email' ])
    });
  };

  return wrapAsync([ handler ]);
};
