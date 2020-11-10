/** @type {import('webpack').Configuration} */
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = {
  output: {
    path: path.join(__dirname, 'lib', 'demo'),
    filename: '[name].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  stats: 'minimal',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  devtool: 'source-map',
  devServer: {
    clientLogLevel: 'silent',
    writeToDisk: true,
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, 'lib'),
  },
  plugins: [new MiniCssExtractPlugin()],
};

const node = merge(common, {
  entry: {
    node: './demo/node.ts',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/node.html',
      filename: 'node.html',
    }),
    new CopyPlugin({
      patterns: [
        path.resolve(__dirname, 'demo', 'index.html'),

        // Browser config. Does not require its own webpack config object,
        // just copy the required files into the dist directory
        path.resolve(__dirname, 'demo', 'browser.html'),
      ],
    }),
  ],
});

const standalone = merge(common, {
  entry: {
    standalone: './demo/standalone.ts',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/standalone.html',
      filename: 'standalone.html',
    }),
  ],
});

const sass = merge(common, {
  entry: {
    sass: './demo/sass.ts',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'demo/sass.html',
      filename: 'sass.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
});

module.exports = [node, standalone, sass];
