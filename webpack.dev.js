const { merge } = require("webpack-merge");
const commonWebpack = require("./webpack.common.js");

module.exports = merge(commonWebpack, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        watchFiles: [".scr/template.html"],
    },
});
