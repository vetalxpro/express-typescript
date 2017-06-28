import { Request, Response } from 'express';

export const dashboardPath = ( req: Request, res: Response ) => {
  res.render('index', { title: 'Dashboard' });
};
