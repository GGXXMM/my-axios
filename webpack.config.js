const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const devConfig = require("./webpack.dev")

const commonConfig = {
  entry: "./src/axios.js",
  output: {
    filename: "axios.js", // 输出的文件名
    path: path.resolve(__dirname, "dist"), // 输出的绝对路径
    library: "axios", // 类库的命名空间
    globalObject: "this", // 适配 Node.js
    libraryTarget: "umd", // umd 打包规范
    libraryExport: "default",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()]
};
module.exports = () => {
  if (process.env && process.env.NODE_ENV == 'production') {

  } else {
    return merge(commonConfig, devConfig)
  }
};
