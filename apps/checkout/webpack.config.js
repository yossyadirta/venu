const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const Dotenv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production' || process.env.NODE_ENV === 'production';

  return {
    entry: './src/index',
    mode: isProduction ? 'production' : 'development',
    output: {
      publicPath: isProduction ? 'auto' : 'http://localhost:3003/',
    },
    devServer: {
      port: 3003,
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
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, 'postcss.config.js'),
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        SUPABASE_URL: '',
        SUPABASE_ANON_KEY: '',
      }),
      new Dotenv({ path: '../../.env', systemvars: true, silent: true }),
      new ModuleFederationPlugin({
        name: 'checkout',
        filename: 'remoteEntry.js',
        exposes: {
          './CheckoutFlow': './src/CheckoutFlow',
          './PaymentSuccessScreen': './src/components/PaymentSuccessScreen',
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
};
