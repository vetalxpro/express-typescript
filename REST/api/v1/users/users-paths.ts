import { Router } from 'express';
import { usersGet, usersPost, usersPut } from './controllers';


class UsersApi {
  public router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.route('/users')
      .get(usersGet)
      .post(usersPost)
      .put(usersPut);
  }
}

export const usersApi = new UsersApi().init();
