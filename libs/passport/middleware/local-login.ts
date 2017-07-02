import { authenticate, AuthenticateOptions } from 'passport';


const authOptions: AuthenticateOptions = {
  session: true,
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
};

/**
 * Passport Local Auth middleware
 *
 *
 *
 */
export const localAuth = authenticate('local', authOptions);
