module.exports = {
  apps: [
    {
      name: 'tcrb-backoffice',
      script: 'npm start',
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 4,
      wait_ready: true,
      listen_timeout: 50000, // ready 시그널까지 기다릴 시간. 시간이 초과하면 앱을 강제로 재시작한다
      kill_timeout: 5000, // SIGINT 시그널 발생 후 SIGKILL 시그널까지 기다릴 시간. 시간이 초과하면 프로세스를 강제 종료한다.
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
