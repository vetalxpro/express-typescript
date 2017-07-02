import { Request, Response } from 'express';


export const simpleLogger = ( req: Request, res: Response, next ) => {
  // console.log(req.headers);
  // console.log(req.ip);
  // console.log(req.query);
  next();
};
