const pack = require('./package.json');
require('dotenv').config({ path: './.env.local' });

module.exports = {
  apps: [
    {
      name: `gour-store-front`,
      script: 'yarn',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        PORT: process.env.PORT || 3500,
      },
    },
  ],
};
