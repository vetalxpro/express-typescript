import { Router } from 'express';
import { getStatus } from './controllers';


class StatusApi {
  public router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.route('/status')
      .get(getStatus);
  }
}

export const statusApi = new StatusApi().init();
