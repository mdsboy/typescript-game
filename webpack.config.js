const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    bundle: './src/index.ts'
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      lib: path.resolve(__dirname, 'src/lib/'),
      scene: path.resolve(__dirname, 'src/scene/'),
    },
    fallback: {
      "stream": require.resolve("stream-browserify")
    }
  },
  devServer: {
    static: "./public"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]
}
