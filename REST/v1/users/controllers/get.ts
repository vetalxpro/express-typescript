import { Request, Response } from 'express';
import { HttpError } from '../../../../libs';
import { User } from '../../../../libs/db/models';


/**
 *
 * @param req
 * @param res
 * @param next
 */
export const getAll = ( req: Request, res: Response, next ) => {
  User.findAll()
    .then(( users ) => {
      res.json(users);
    })
    .catch(next);
};

export const getById = ( req: Request, res: Response, next ) => {
  const id = req.params.id;
  // console.log(req);
  User.findById(id)
    .then(( user ) => {
      if ( !user ) {
        return next(new HttpError(404, 'User not found'));
      }
      return res.json(user);
    })
    .catch(next);
};
