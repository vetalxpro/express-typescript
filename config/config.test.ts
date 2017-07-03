const port = process.env.PORT || 3000;

const config = {
  env: 'test',
  mongoose: {
    host: 'mongodb://localhost/test'
  }
};

export { config as configTest };

