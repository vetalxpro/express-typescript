export const logout = () => {
  return ( req, res ) => {
    req.logout();
    res.redirect('/');
  };
};
