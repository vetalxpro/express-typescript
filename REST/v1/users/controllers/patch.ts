import { Request, RequestHandler, Response } from 'express';
import { User } from '../../../../libs/db/models';
import { HttpError } from '../../../../libs/errors';
import { wrapAsync } from '../../../../libs/utils';
import { checkObjectId } from '../../../../middleware';

/**
 *
 * @returns {RequestHandler|RequestHandler[]}
 */
export const updateById = (): RequestHandler | RequestHandler[] => {
  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<any>}
   */
  const handler = async ( req: Request, res: Response, next ) => {
    const id = req.params.id;
    const updatedUser = {
      username: req.body.username
    };

    const user = await User.updateById(id, updatedUser);
    if ( !user ) {
      return next(new HttpError(404, 'User not found'));
    }
    return res.status(200).json(user);

  };

  return wrapAsync([ checkObjectId, handler ]);
};
