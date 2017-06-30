import { Router } from 'express';
import { deleteById, getById, getAll, login, register, updateById } from './controllers';
import { checkObjectId, passportJwtAuth } from '../../../middleware';


class UsersApi {
  public router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.get('/users', getAll);
    this.router.post('/users/registration', register);
    this.router.post('/users/login', login);

    this.router.route('/users/:id')
      .get(passportJwtAuth, checkObjectId, getById)
      .patch(checkObjectId, updateById)
      .delete(checkObjectId, deleteById);

  }
}

export const usersApi = new UsersApi().init();
