const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const nodeXternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin");
require("dotenv").config();
const webpack = require("webpack");

module.exports = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const isDevelopment = !isProduction;
  isProduction && console.log("Generating production build...");
  const isFee = process.env.mode === "fee";

  const fee = {
      mode: isProduction ? "production" : "development",
      devtool: isDevelopment && "inline-source-map",
      entry: "./src/frontend/index.tsx",
      devServer: {
        contentBase: "./dist/public",
        port: 3000,
        host: "localhost",
        hot: true,
        open: true,
        historyApiFallback: true,
        compress: true,
        overlay: true,
        proxy: [
          {
            context: ["/gql", "/api"],
            target: `http://localhost:${process.env.SERVER_PORT}`
          }
        ]
        // proxy: {
        //   "/api": "http://localhost:5000"
        // }
      },
      output: {
        path: path.resolve(__dirname, "dist", "public"),
        filename: "js/app.bundle.js"
      },
      externals: {
        moment: "moment"
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: ["ts-loader"],
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: [
              isProduction ? MiniCSSExtractPlugin.loader : "style-loader",
              "css-loader"
            ]
          },
          {
            test: /\.(png|jpg|gif|ico)$/,
            use: {
              loader: "url-loader",
              options: {
                limit: 8192,
                name: "media/[name].[hash:8].[ext]"
              }
            }
          },
          {
            test: /\.(eot|otf|woff|woff2)$/,
            use: {
              loader: "url-loader",
              options: {
                name: "media/[name].[hash:8].[ext]"
              }
            }
          },
          {
            test: /\.svg$/,
            use: ["@svgr/webpack"]
          }
        ]
      },

      resolve: {
        extensions: [".ts", ".tsx", ".js"]
      },
      plugins: [
        new CleanWebpackPlugin(),
        isProduction
          ? new MiniCSSExtractPlugin({
              filename: "css/app.bundle.css"
            })
          : () => {},
        new HtmlWebpackPlugin({
          title: "Webpack, How-to",
          template: "./src/frontend/index.html"
        }),
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(
            isProduction ? "production" : "development"
          )
        })
      ],
      // Optimization
      optimization: isProduction
        ? {
            minimize: isProduction,
            minimizer: [
              new TerserWebpackPlugin({
                terserOptions: {
                  compress: {
                    comparisons: false
                  },
                  mangle: {
                    safari10: true
                  },
                  output: {
                    comments: false,
                    ascii_only: true
                  },
                  warnings: false
                }
              }),
              new OptimizeCssAssetsPlugin()
            ]
          }
        : {}
    },
    bee = {
      target: "node",
      mode: isProduction ? "production" : "development",
      devtool: isDevelopment && "inline-source-map",
      entry: "./src/backend/index.ts",
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.server.js"
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: ["ts-loader"],
            exclude: /node_modules/
          }
        ]
      },
      externals: [nodeXternals()],
      resolve: {
        extensions: [".ts"]
      },
      plugins: [
        new CopyPlugin([{ from: ".env", to: ".env", toType: "file" }]),
        isDevelopment
          ? new WebpackShellPlugin({
              onBuildEnd: ["yarn watch:bee"]
            })
          : () => {},
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(
            isProduction ? "production" : "development"
          )
        })
      ],
      // Optimization
      optimization: isProduction
        ? {
            minimize: isProduction,
            minimizer: [
              new TerserWebpackPlugin({
                terserOptions: {
                  compress: {
                    comparisons: false
                  },
                  mangle: {
                    safari10: true
                  },
                  output: {
                    comments: false,
                    ascii_only: true
                  },
                  warnings: false
                }
              })
            ]
          }
        : {}
    };

  return isProduction ? [fee, bee] : isFee ? fee : bee;
};
