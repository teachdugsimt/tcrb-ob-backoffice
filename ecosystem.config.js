module.exports = {
  apps: [
    {
      name: 'tcrb-backoffice',
      script: 'npm start',
      instances: 1,
      autorestart: true,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'development',
        PORT: '5000',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: '5000',
      },
    },
  ],
}
