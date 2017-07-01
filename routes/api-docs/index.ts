import { Request, Response } from 'express';
import { swaggerSpec } from '../../libs/swagger-jsdoc';
import * as swaggerUiDistPath from 'swagger-ui-dist/absolute-path';


export { swaggerUiDistPath };

export const apiSpecPath = ( req: Request, res: Response ) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
};
