import { Request, Response } from 'express';

export const usersPut = ( req: Request, res: Response, next ) => {
  res.json({ users: true });
};
