const port = process.env.PORT || 3000;
const host = `http://localhost`;

const config = {
  env: process.env.NODE_ENV || 'development',
  server: {
    port: port,
    host: host,
    callbackUrl: `${host}:${port}`,
    clientUrl: `${host}:4200`, // angular 2 webpack-dev-server (example)
    contentLengthOptions: {
      max: 10 * 1000 * 1000, // 10Mb
      message: 'Invalid payload; too bigd.',
      status: 400
    }
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
      clientID: '441428006509-34qjiv949e9f9h5bmbueuleqchjvto6m.apps.googleusercontent.com',
      clientSecret: 'zgyIIPOkxtrgUGObwkt94Bc_'
    },
    facebookAuthOptions: {
      clientID: '393451751013103',
      clientSecret: 'cd441f83eb3c78a7cc2068ca3e6429ef'
    },
    twitterAuthOptions: {
      consumerKey: 'GQoeDIBuVHbYMpiA7llKsfnff',
      consumerSecret: 'eNIo2euFs81Mv1cQTaEnS468E8s7wHYuFjPOwFBL3mhrWaypMB'
    },
    vkontakteAuthOptions: {
      clientID: '6096996',
      clientSecret: 'cDb8sX3nMnqpZ5Ll0l9P'
    }
  },
  socket: {
    enable: true
  }
};

export { config as configCommon };
