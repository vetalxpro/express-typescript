import { Request, Response } from 'express';

export const usersPost = ( req: Request, res: Response, next ) => {
  res.json({ users: true });
};
