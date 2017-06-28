import { Request, Response } from 'express';

export const homePath = ( req: Request, res: Response ) => {
  res.render('index', { title: 'Express' });
};
