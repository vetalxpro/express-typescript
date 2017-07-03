import { Request, RequestHandler, Response } from 'express';
import { isFunction, isArray } from 'lodash';

/**
 * Wrap async function to standard express function
 * @param {Function} handler the async function
 * @returns {Function} the wrapped function
 */
function wrapRoute( handler: RequestHandler ): RequestHandler {
  if ( !isFunction(handler) ) {
    throw new Error('fn should be a function');
  }
  return ( req: Request, res: Response, next ) => {
    try {
      const result = handler(req, res, next);
      if ( result && result.catch ) {
        result.catch(next);
      }
    } catch ( err ) {
      next(err);
    }
  };
}

/**
 * Wrap all middlewares from array
 * @param handler the object (controller exports)
 * @returns {Function|Array} the wrapped object
 */
export function wrapAsync( handler: RequestHandler | RequestHandler[] ): RequestHandler | RequestHandler[] {
  if ( isArray(handler) ) {
    return handler.map(( item ) => wrapRoute(item));
  }
  return wrapRoute(handler);
}
