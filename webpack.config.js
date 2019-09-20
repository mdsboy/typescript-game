const path = require('path')
module.exports = {
  entry: {
    bundle: './src/index.ts'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      lib: path.resolve(__dirname, 'src/lib/'),
      scene: path.resolve(__dirname, 'src/scene/'),
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
}
