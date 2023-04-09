const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "cheap-source-map",
  devServer: {
    static: "./examples",
    open: true, // 自动打开浏览器
    port: 8088,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "examples/index.html", // 使用模板文件
      inject: "head",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
