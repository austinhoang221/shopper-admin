/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/app/components"),
      "@pages": path.resolve(__dirname, "src/app/pages"),
      "@utils": path.resolve(__dirname, "src/app/utils"),
      "@hooks": path.resolve(__dirname, "src/app/hooks"),
      "@hoc": path.resolve(__dirname, "src/app/hoc"),
    },
  },
};
