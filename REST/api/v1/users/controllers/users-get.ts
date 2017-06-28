import { Request, Response } from 'express';

export const usersGet = ( req: Request, res: Response, next ) => {
  res.json({ users: true });
};
