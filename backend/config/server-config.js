
const env_port = process.env.PORT || '3000';

var config = {
  development: {
      url: 'localhost:3000', //url to be used in link generation
      db: {
          host:   '127.0.0.1',
          port:   '27017',
          name:     'electrovision_development',
          options: {
            useMongoClient: true,
            poolSize: 5
          }
      },
      server: {
          host: '127.0.0.1',
          port: '3000'
      }
  },
  production: {
      url: 'http://my.site.com', //url to be used in link generation
      db: {
          host: '127.0.0.1',
          port: '27017',
          name:   'electrovision',
          options: {
            useMongoClient: true,
            poolSize: 5
          }
      },
      server: {
          host:  '127.0.0.1',
          port:  env_port
      }
  }
  };

  module.exports = config;
