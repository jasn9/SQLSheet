const path = require('path');

module.exports = {
  entry: './src/view.ts',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'src')],
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
      extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle-view.js',
    path: path.resolve(__dirname, 'public'),
  },
};