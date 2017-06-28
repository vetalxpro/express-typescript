import { Router } from 'express';
import { homePath, dashboardPath } from './pages';


class PagesRouter {
  private router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.get('/', homePath);
    this.router.get('/dashboard', dashboardPath);
  }
}

export const pagesRouter = new PagesRouter().init();
