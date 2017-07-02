import { Router } from 'express';

class ApiV2 {
  private router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {


  }
}

export const apiV2 = new ApiV2();
