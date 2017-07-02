import { Router } from 'express';
import * as controllers from './controllers';

class AuthRouter {
  private router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.get('/google', controllers.oauthGoogle());
    this.router.get('/facebook', controllers.oauthFacebook());
    this.router.get('/twitter', controllers.oauthTwitter());
    this.router.get('/vkontakte', controllers.oauthVkontakte());
    this.router.get('/google/callback', controllers.oauthGoogleCallback());
    this.router.get('/facebook/callback', controllers.oauthFacebookCallback());
    this.router.get('/twitter/callback', controllers.oauthTwitterCallback());
    this.router.get('/vkontakte/callback', controllers.oauthVkontakteCallback());
  }
}

export const authRouter = new AuthRouter();
