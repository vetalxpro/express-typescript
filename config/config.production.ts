const port = process.env.PORT || 3000;
const host = 'http://example.com';

const config = {
  env: 'production',
  server: {
    port: port,
    host: host,
    callbackUrl: `${host}`,
    clientUrl: `${host}`
  }
};


export { config as configProduction };
