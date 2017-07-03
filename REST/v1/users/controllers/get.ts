import { Request, RequestHandler, Response } from 'express';
import { User } from '../../../../libs/db/models';
import { HttpError } from '../../../../libs/errors';
import { jwtAuth } from '../../../../libs/passport/middleware';
import { wrapAsync } from '../../../../libs/utils';
import { checkObjectId } from '../../../../middleware';

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns an array of users
 *     operationId: getUsers
 *     tags:
 *     - users
 *     security:
 *     - JWTAuth: []
 *     parameters: []
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 */

/**
 *
 * @returns {RequestHandler|RequestHandler[]}
 */
export const getAll = (): RequestHandler | RequestHandler[] => {
  /**
   *
   * @param req
   * @param res
   * @returns {Promise<Response>}
   */
  const handler = async ( req: Request, res: Response ) => {
    const users = await User.findAll();
    return res.json(users);
  };

  return wrapAsync([ jwtAuth, handler ]);
};

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by id
 *     operationId: getUserById
 *     tags:
 *     - users
 *     parameters:
 *     - name: id
 *       in: path
 *       description: user id
 *       required: 'true'
 *       type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/User'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       404:
 *         $ref: '#/responses/NotFound'
 */

/**
 *
 * @returns {RequestHandler|RequestHandler[]}
 */
export const getById = (): RequestHandler | RequestHandler[] => {
  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<any>}
   */
  const handler = async ( req: Request, res: Response, next ) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if ( !user ) {
      return next(new HttpError(404, 'User not found'));
    }
    return res.json(user);
  };

  return wrapAsync([ jwtAuth, checkObjectId, handler ]);
};

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Returns a user profile
 *     operationId: getUserProfile
 *     tags:
 *     - users
 *     security:
 *     - JWTAuth: []
 *     parameters: []
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/User'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       404:
 *         $ref: '#/responses/NotFound'
 */

/**
 *
 * @returns {RequestHandler|RequestHandler[]}
 */
export const getProfile = (): RequestHandler | RequestHandler[] => {
  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<any>}
   */
  const handler = async ( req: Request, res: Response, next ) => {
    const id = req.user._id;
    const user = await User.findById(id);
    if ( !user ) {
      return next(new HttpError(404, 'User not found'));
    }
    return res.json(user);
  };

  return wrapAsync([ jwtAuth, handler ]);
};
