import * as express from 'express';
import { Request, Response, Router } from 'express';
import { join } from 'path';
import * as swaggerUiDistPath from 'swagger-ui-dist/absolute-path';
import { swaggerSpec } from '../../libs/swagger-jsdoc';


const apiSpecHandler = ( req: Request, res: Response ) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
};

class ApiDocsRouter {
  private router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.use(express.static(join(__dirname, '../../api-docs')));
    this.router.use(express.static(swaggerUiDistPath()));
    this.router.get('/swagger.json', apiSpecHandler);
  }

}

export const apiDocsRouter = new ApiDocsRouter();
