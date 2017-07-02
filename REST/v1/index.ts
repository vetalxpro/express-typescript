import { Router } from 'express';
import { statusApi } from './status/status-api';
import { usersApi } from './users/users-api';

class ApiV1 {
  private router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.use('/status', statusApi.init());
    this.router.use('/users', usersApi.init());

  }
}

export const apiV1 = new ApiV1();
