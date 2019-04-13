module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps : [
  
      // Client Development Application
      {
        name      : 'fw-client',
        script    : 'server.js',
        env: {
          PORT    : 8080
        },
        env_production: {
          NODE_ENV: 'production',
          PORT    : 80
        }
      },
      // Server
      {
        name      : 'fw-api',
        script    : 'npm',
        args:    'start',
        cwd       : 'api',
        env: {
          PORT    : 8081
        },
        env_production: {
          NODE_ENV: 'production',
          PORT    : 8081
        }
      },
    ],
  };
