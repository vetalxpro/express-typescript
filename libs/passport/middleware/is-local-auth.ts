/**
 * Passport check local auth middleware
 * @param req
 * @param res
 * @param next
 */
export const isLocalAuth = ( req, res, next ) => {
  req.isAuthenticated() ? next() : res.redirect('/login');
};
