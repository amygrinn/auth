const path = require('path');

const PACKAGE_NAME = 'tay-auth';
const LIBRARY_NAME = 'TayAuth';

module.exports = {
  entry: {
    [`${PACKAGE_NAME}.min`]: './src/browser.tsx',
  },
  output: {
    path: path.join(__dirname, 'lib'),
    libraryTarget: 'window',
    library: LIBRARY_NAME,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  mode: process.env.NODE_ENV || 'development',
  externals: { react: 'React' },
};
