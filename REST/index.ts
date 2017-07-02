import { Router } from 'express';
import { apiV1 } from './v1';
import { apiV2 } from './v2';


export class RestRouter {
  private router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.use('/api/v1', apiV1.init());
    this.router.use('/api/v2', apiV2.init());
  }
}

export const restRoutes = new RestRouter();
