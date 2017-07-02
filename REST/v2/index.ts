import { Router } from 'express';

class ApiV2 {
  private router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.get('/', ( req, res, next ) => {
      res.send('please use /api/v1');
    });

  }
}

export const apiV2 = new ApiV2();
