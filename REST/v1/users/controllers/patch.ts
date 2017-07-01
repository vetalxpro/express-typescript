import { Request, Response } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { HttpError } from '../../../../libs';
import { User } from '../../../../libs/db/models';
import { checkObjectId } from '../../../../middleware';

/**
 *
 * @returns {[express.Handler]}
 */
export const updateById = (): RequestHandlerParams => {
  const handler = ( req: Request, res: Response, next ) => {
    const id = req.params.id;
    const updatedUser = {
      username: req.body.username
    };

    User.updateById(id, updatedUser)
      .then(( user ) => {
        if ( !user ) {
          return next(new HttpError(404, 'User not found'));
        }
        return res.status(200).json(user);
      })
      .catch(next);
  };

  return [
    checkObjectId,
    handler
  ];
};
