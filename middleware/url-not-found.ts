import { HttpError } from '../libs/errors';

export const urlNotFound = ( req, res, next ) => {
  next(new HttpError(404, 'Страница не найдена'));
};
