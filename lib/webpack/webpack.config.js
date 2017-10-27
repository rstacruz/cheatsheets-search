var join = require('path').join
var webpack = require('webpack')

module.exports = {
  entry: {
    search: join(__dirname, '..', 'searcher', 'index.js')
  },

  output: {
    path: join(__dirname, '..', '..', 'public'),
    filename: '[name].js',
    library: ['Search'],
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'env'
              ]
            }
          }
        ]
      }
    ]
  }
}
