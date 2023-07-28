const path = require("path");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css"],
  },
  module: {
    rules: [
      {
        // Typescript loader
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        // CSS Loader
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
      chunkFilename: "[name].[chunkhash].chunk.css",
    }),
    new Dotenv(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: "./",
        },
      ],
    }),
  ],
  devServer: {
    open: true,
    hot: true,
    port: 5280,
    historyApiFallback: true,
  },
};
