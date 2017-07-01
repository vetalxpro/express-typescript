import { Request, Response } from 'express';


/**
 * @swagger
 * /status:
 *   get:
 *     description: Returns servers status
 *     tags:
 *     - status
 *     produces:
 *     - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/Status'
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
