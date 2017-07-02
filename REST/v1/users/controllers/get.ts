import { Request, Response } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { HttpError } from '../../../../libs';
import { User } from '../../../../libs/db/models';
import { checkAdmin, checkObjectId } from '../../../../middleware';
import { jwtAuth } from '../../../../libs/passport/middleware';


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
export const getAll = (): RequestHandlerParams => {
  const handler = ( req: Request, res: Response, next ) => {
    User.findAll()
      .then(( users ) => {
        return res.json(users);
      })
      .catch(next);
  };
  return [
    jwtAuth,
    handler
  ];
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
export const getById = (): RequestHandlerParams => {
  const handler = ( req: Request, res: Response, next ) => {
    const id = req.params.id;
    User.findById(id)
      .then(( user ) => {
        if ( !user ) {
          return next(new HttpError(404, 'User not found'));
        }
        return res.json(user);
      })
      .catch(next);
  };
  return [
    checkAdmin,
    checkObjectId,
    handler
  ];
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
export const getProfile = (): RequestHandlerParams => {
  const handler = ( req: Request, res: Response, next ) => {
    const id = req.user._id;
    User.findById(id)
      .then(( user ) => {
        if ( !user ) {
          return next(new HttpError(404, 'User not found'));
        }
        return res.json(user);
      })
      .catch(next);
  };
  return [
    jwtAuth,
    handler
  ];
};
