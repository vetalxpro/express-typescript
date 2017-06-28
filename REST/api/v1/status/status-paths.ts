import { Router } from 'express';
import { statusGet } from './controllers';


class StatusApi {
  public router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.route('/status')
      .get(statusGet);
  }
}

export const statusApi = new StatusApi().init();
