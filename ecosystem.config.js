module.exports = {
  apps : [{
    name: "Safinatec-api",
    script: 'node_modules/.bin/ts-node',
    args: 'src/main.ts',
    watch: '.',
    exec_mode: "cluster",
    instances: 1,
  }]
};
