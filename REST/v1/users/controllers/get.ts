import { Request, Response } from 'express';
import { HttpError } from '../../../../libs';
import { User } from '../../../../libs/db/models';


/**
 *
 * @param req
 * @param res
 * @param next
 */
export const getUsers = ( req: Request, res: Response, next ) => {
  User.getUsers()
    .then(( users ) => {
      res.json(users);
    })
    .catch(next);
};

export const getUserById = ( req: Request, res: Response, next ) => {
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
