import { Router } from 'express';
import * as controllers from './controllers';

class PagesRouter {
  private router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.get('/', controllers.showIndexPage());
    this.router.get('/dashboard', controllers.showDashboardPage());
    this.router.get('/login', controllers.showLoginPage());
    this.router.post('/login', controllers.postLogin());
    this.router.get('/logout', controllers.logout());

  }
}

export const pagesRouter = new PagesRouter();
