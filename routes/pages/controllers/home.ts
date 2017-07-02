import { Request, Response } from 'express';

export const showHomePage = () => {
  const handler = ( req: Request, res: Response ) => {
    res.render('index', { title: 'Express' });
  };

  return [
    handler
  ];
};
