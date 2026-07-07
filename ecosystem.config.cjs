module.exports = {
  apps: [
    {
      name: "global-history-lens",
      script: "dist/index.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        AUTH_DATA_FILE: "/var/www/global-history-lens/data/auth-users.json",
      },
    },
  ],
};
