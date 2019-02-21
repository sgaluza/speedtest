const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./build/app"
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 500
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[hash:8].js"
  },
  module: {
    rules: [
      {
        test: /worker.js$/,
        use: {
          loader: "worker-loader",
          options: {
            name: "[name].[hash:8].js"
          }
        }
      },
      {
        test: /\..*\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.(scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 1024,
          name: "[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[hash:8].[ext]"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist/*"], {
      root: __dirname
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CopyWebpackPlugin([{ from: "src/assets/", to: "." }]),
    new webpack.DefinePlugin({
      BUILD_DATE: new Date().getTime(),
      VERSION: JSON.stringify(require("./package.json").version)
    })
  ]
};
