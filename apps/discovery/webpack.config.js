const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3001/',
  },
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules\/(?!loka)/,
      },
    ],
  },
  plugins: [
    new Dotenv({ path: '../../.env', systemvars: true }),
    new ModuleFederationPlugin({
      name: 'discovery',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.2.0' },
        'react-router-dom': { singleton: true, eager: true },
        '@tanstack/react-query': { singleton: true, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
