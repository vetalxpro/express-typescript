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
    this.router.get('/users', controllers.getAll());

    this.router.route('/users/registration')
      .post(controllers.localRegister())
      .all(urlNotFound);

    this.router.route('/users/login')
      .post(controllers.localLogin())
      .all(urlNotFound);

    this.router.route('/users/profile')
      .get(controllers.getProfile())
      .all(urlNotFound);

    this.router.get('/users/auth/google', controllers.authGoogle());
    this.router.get('/users/auth/facebook', controllers.authFacebook());
    this.router.get('/users/auth/twitter', controllers.authTwitter());
    this.router.get('/users/auth/vkontakte', controllers.authVkontakte());
    this.router.get('/users/auth/google/callback', controllers.authGoogleCallback());
    this.router.get('/users/auth/facebook/callback', controllers.authFacebookCallback());
    this.router.get('/users/auth/twitter/callback', controllers.authTwitterCallback());
    this.router.get('/users/auth/vkontakte/callback', controllers.authVkontakteCallback());

    this.router.route('/users/:id')
      .get(controllers.getById())
      .patch(controllers.updateById())
      .delete(controllers.deleteById());

  }
}

export const usersApi = new UsersApi().init();
