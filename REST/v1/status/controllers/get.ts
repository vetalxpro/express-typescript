import { Request, RequestHandler, Response } from 'express';


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
export const getStatus = (): RequestHandler | RequestHandler[] => {
  /**
   *
   * @param req
   * @param res
   * @returns {Response}
   */
  const handler = ( req: Request, res: Response ) => {
    const time = Date.now();
    return res.json({
      status: 'OK',
      started: new Date(req.app.locals.startTime).toString(),
      uptime: (time - req.app.locals.startTime) / 1000,
      currentTime: new Date(time).toString()
    });
  };

  return [ handler ];
};
