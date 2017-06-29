const port = process.env.PORT || 3000;
const host = 'localhost';
const apiPath = '/api/v1';

const config = {
  env: process.env.NODE_ENV || 'development',
  server: {
    port: port,
    host: host,
    apiPath: apiPath,
    callbackUrl: `${host}:${port}`,
    clientUrl: `${host}:4200` // angular 2 webpack-dev-server (example)
  },
  mongoose: {
    host: 'mongodb://localhost/somebase',
    options: {
      useMongoClient: false
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    options: {
      expiresIn: 7 * 24 * 60 * 60 * 1000
    }
  },
  sessionOptions: {
    secret: process.env.SESSION_SECRET || 'secret',
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
  },
  passport: {
    googleAuthOptions: {
      clientID: 'CLIENT_ID',
      clientSecret: 'CLIENT_SECRET',
      callbackURL: `${host}:${port}:${apiPath}/users/login/google/callback`
    },
    facebookAuthOptions: {
      clientID: 'CLIENT_ID',
      clientSecret: 'CLIENT_SECRET',
      callbackURL: `${host}:${port}:${apiPath}/users/login/facebook/callback`
    },
    twitterAuthOptions: {}
  },
  socket: {
    enable: true
  }
};

export { config as configCommon };
