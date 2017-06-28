const config: any = {
  env: process.env.NODE_ENV || 'development',
  server: {
    port: process.env.PORT || 3000,
    host: 'localhost',
    apiPath: '/api/v1'
  },
  mongoose: {
    host: 'mongodb://localhost/somebase',
    options: {}
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    options: {
      expiresIn: 7 * 24 * 60 * 60 * 1000
    }
  },
  sessionOptions: {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
    }
  },
  mailer: {
    gmail: {
      service: 'Gmail',
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD
      }
    },
    yandex: {
      service: 'Yandex',
      auth: {
        user: process.env.YANDEX_USER,
        pass: process.env.YANDEX_PASSWORD
      }
    },
    mailOptions: {
      from: `name ${process.env.EMAIL}`,
      to: 'dest email',
      subject: 'subject',
      text: 'body plain text',
      html: `<h3>body html text</h3>`
    }
  },
  helmetOptions: {
    hidePoweredBy: true
  },
  corsOptions: {
    maxAge: 600 // sec,
  }
};

config.server.callbackUrl = `${config.server.host}:${config.server.port}`;
config.server.clientUrl = `${config.server.host}:4200`; // example angular2 dev server

config.passport = {
  googleAuthOptions: {
    clientID: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    callbackURL: `${config.server.callbackUrl + config.server.apiRoute}/users/login/google/callback`
  },
  facebookAuthOptions: {
    clientID: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    callbackURL: `${config.server.callbackUrl + config.server.apiRoute}/users/login/facebook/callback`
  },
  twitterAuthOptions: {}
};

export { config as configCommon };
