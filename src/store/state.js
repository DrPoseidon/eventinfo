const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        Components: path.resolve(__dirname, "src/components"),
        Pages: path.resolve(__dirname, "src/pages"),
      },
    },
  },
};
