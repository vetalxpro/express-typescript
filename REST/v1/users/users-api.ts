import { Router } from 'express';
import { urlNotFound } from '../../../middleware';
import * as controllers from './controllers';


class UsersApi {
  public router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.get('/', controllers.getAll());

    this.router.route('/registration')
      .post(controllers.localRegister())
      .all(urlNotFound);

    this.router.route('/login')
      .post(controllers.localLogin())
      .all(urlNotFound);

    this.router.route('/profile')
      .get(controllers.getProfile())
      .all(urlNotFound);

    this.router.route('/:id')
      .get(controllers.getById())
      .patch(controllers.updateById())
      .delete(controllers.deleteById());

  }
}

export const usersApi = new UsersApi();
