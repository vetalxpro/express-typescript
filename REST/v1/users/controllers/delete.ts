import { Request, Response } from 'express';
import { HttpError } from '../../../../libs';
import { User } from '../../../../libs/db/models';


/**
 *
 * @param req
 * @param res
 * @param next
 */
export const deleteUserById = ( req: Request, res: Response, next ) => {
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
