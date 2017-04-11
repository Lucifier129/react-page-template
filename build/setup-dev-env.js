var path = require('path')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var clientConfig = require('./webpack.config')

exports.setupClient = function setupClient (publicPath) {
  var clientDevMiddleware = webpackDevMiddleware(webpack(clientConfig), {
    publicPath: publicPath,
    stats: {
      colors: true,
      chunks: false
    },
    serverSideRender: true
  })
  return clientDevMiddleware
}
