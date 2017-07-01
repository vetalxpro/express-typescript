import * as express from 'express';
import { Router } from 'express';
import { join } from 'path';
import { apiSpecPath, swaggerUiDistPath } from './api-docs';
import { dashboardPath, homePath } from './pages';


class PagesRouter {
  private router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.get('/', homePath);
    this.router.get('/dashboard', dashboardPath);
    this.router.use('/api-docs', express.static(join(__dirname, '../api-docs')));
    this.router.use('/api-docs', express.static(swaggerUiDistPath()));
    this.router.get('/api-docs/swagger.json', apiSpecPath);
  }
}

export const pagesRouter = new PagesRouter().init();
