module.exports = {
  apps: [
    {
      name: 'pinkod',
      port: '3009',
      exec_mode: 'fork',
      env: { HOST: '127.0.0.1', PORT: 3009 },
      script: './.output/server/index.mjs'
    }
  ]
}

