import { Router } from 'express';
import { pagesRouter } from './pages/pages-router';
import { apiDocsRouter } from './api-docs/api-docs-router';
import { authRouter } from './oauth/oauth-router';


class Routes {
  private router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.use('/', pagesRouter.init());
    this.router.use('/api-docs', apiDocsRouter.init());
    this.router.use('/oauth', authRouter.init());
  }
}

export const routes = new Routes();
