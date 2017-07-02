import { Router } from 'express';
import * as controllers from './controllers';


class StatusApi {
  public router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.get('/', controllers.getStatus());
  }
}

export const statusApi = new StatusApi();
