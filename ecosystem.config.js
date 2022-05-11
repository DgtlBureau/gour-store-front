const pack = require('./package.json');

module.exports = {
  apps : [{
    name: `${pack.name}`,
    script: "npm",
    args : "start",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '300M',
  }]
}