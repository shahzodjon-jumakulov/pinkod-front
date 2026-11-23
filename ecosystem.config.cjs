module.exports = {
  apps: [
    {
      name: 'pinkod',
      port: '3009',
      exec_mode: 'fork',
      script: './.output/server/index.mjs'
    }
  ]
}

