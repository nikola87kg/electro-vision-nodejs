
const env_port = process.env.PORT || '3000';
const env_host = process.env.HOST || 'localhost';

var config = {
  development: {
      url: 'localhost:3000', //url to be used in link generation
      db: {
            user: 'Nikola',
            password: 'Fgo2XsVOFfNzw3id',
            url: 'electrovision-cluster-vludv.mongodb.net',
            name: 'test',
            options: 'retryWrites=true',
      },
      server: {
            host:  env_host,
            port:  env_port
      }
  },
  production: {
      url: 'http://my.site.com', //url to be used in link generation
      db: {
            user: 'Nikola',
            password: 'Fgo2XsVOFfNzw3id',
            url: 'electrovision-cluster-vludv.mongodb.net',
            name: 'electrovision-db',
            options: 'retryWrites=true',
      },
      server: {
            host:  env_host,
            port:  env_port
      }
  }
  };

  module.exports = config;
