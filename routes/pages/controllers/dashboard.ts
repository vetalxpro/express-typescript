import { Request, Response } from 'express';
import { isLocalAuth } from '../../../libs/passport/middleware';

export const showDashboardPage = () => {
  const handler = ( req: Request, res: Response ) => {
    res.render('dashboard', { title: 'Dashboard' });
  };

  return [
    isLocalAuth,
    handler
  ];
};
