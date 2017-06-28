export const config: any = {
  env: 'production',
  server: {
    host: 'http://example.com',
    apiPath: '/api/v1'
  },
  mailer: {}
};

config.server.callbackUrl = `${config.server.host}`;
config.server.clientUrl = `${config.server.host}`;

config.passport = {
  googleAuthOptions: {
    callbackURL: `${config.server.host + config.server.apiRoute}/users/login/google/callback`
  },
  facebookAuthOptions: {
    callbackURL: `${config.server.host + config.server.apiRoute}/users/login/facebook/callback`
  },
  twitterAuthOptions: {}
};

export { config as configProduction };
