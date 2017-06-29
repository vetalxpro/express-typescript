import { Request, Response } from 'express';


/**
 *
 * @param req
 * @param res
 * @returns {Response}
 */
export const getStatus = ( req: Request, res: Response ) => {
  const time = new Date();

  return res.json({
    status: 'OK',
    started: new Date(req.app.locals.startTime),
    uptime: (time as any - req.app.locals.startTime) / 1000,
    currentTime: time
  });
};
