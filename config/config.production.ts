const port = process.env.PORT || 3000;
const host = 'example.com';
const apiPath = '/api/v1';

const config = {
  env: 'production',
  server: {
    port: port,
    host: host,
    callbackUrl: `${host}`,
    clientUrl: `${host}`
  },
  passport: {
    googleAuthOptions: {
      callbackURL: `${host}${apiPath}/users/login/google/callback`
    },
    facebookAuthOptions: {
      callbackURL: `${host}${apiPath}/users/login/facebook/callback`
    },
    twitterAuthOptions: {}
  }
};


export { config as configProduction };
