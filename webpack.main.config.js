const path = require('path');

module.exports = {
  entry: './src/main.ts',
  target: 'electron-main',
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
    filename: 'bundle-main.js',
    path: path.resolve(__dirname, 'public'),
  },
};