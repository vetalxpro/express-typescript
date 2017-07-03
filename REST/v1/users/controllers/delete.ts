import { Request, RequestHandler, Response } from 'express';
import { User } from '../../../../libs/db/models';
import { HttpError } from '../../../../libs/errors';
import { jwtAuth } from '../../../../libs/passport/middleware';
import { wrapAsync } from '../../../../libs/utils';
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

/**
 *
 * @returns {RequestHandler|RequestHandler[]}
 */
export const deleteById = (): RequestHandler | RequestHandler[] => {
  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<any>}
   */
  const handler = async ( req: Request, res: Response, next ) => {
    const id = req.params.id;
    const result = await User.removeById(id);

    if ( !result ) {
      return next(new HttpError(404, 'User not found'));
    }
    return res.status(200).json({
      status: 'OK'
    });

  };

  return wrapAsync([ jwtAuth, checkObjectId, handler ]);
};
