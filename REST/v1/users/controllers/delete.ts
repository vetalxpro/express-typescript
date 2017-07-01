import { Request, Response } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { HttpError } from '../../../../libs';
import { User } from '../../../../libs/db/models';
import { passportJwtAuth } from '../../../../libs/passport';
import { checkObjectId } from '../../../../middleware';

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by id
 *     operationId: deleteUserById
 *     tags:
 *     - users
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: user id
 *       required: 'true'
 *       type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *           example:
 *             status: OK
 *       404:
 *         "$ref": "#/responses/NotFound"
 */
export const deleteById = (): RequestHandlerParams => {
  const handler = ( req: Request, res: Response, next ) => {
    const id = req.params.id;
    User.removeById(id)
      .then(( user ) => {
        if ( !user ) {
          return next(new HttpError(404, 'User not found'));
        }
        return res.status(200).json({
          status: 'OK'
        });
      })
      .catch(next);
  };
  return [
    passportJwtAuth,
    checkObjectId,
    handler
  ];
};
