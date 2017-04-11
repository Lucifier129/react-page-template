var webpack = require('webpack')
var path = require('path')
var BundleAnalyzerPlugin = require(
  'webpack-bundle-analyzer'
).BundleAnalyzerPlugin
var StatsPlugin = require('./webpack.stats.plugin')
var OptimizeJsPlugin = require('optimize-js-plugin')

var entry = require('./webpack.config.entry')
var alias = {}
var cwd = process.cwd()
var outputPath = path.join(cwd, 'dest')
var output = {
  path: outputPath,
  filename: `[name].js`,
  chunkFilename: '[name].js'
}

var plugins = [
  new StatsPlugin('stats.json'),
  // new webpack.optimize.OccurrenceOrderPlugin(false),
  // extract vendor chunks for better caching
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
  }),
  new webpack.optimize.CommonsChunkPlugin({
    children: true,
    minChunks: 5
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    )
  })
]
var watch = true
var devtool = '#source-map'

if (process.env.NODE_ENV === 'production') {
  devtool = ''
  output = {
    path: outputPath,
    filename: '[name]-[hash:6].js',
    chunkFilename: '[name]-[chunkhash:6].js'
  }
  plugins = plugins.concat([
    // banner
    // new webpack.BannerPlugin(banner),
    new webpack.optimize.DedupePlugin(),
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      // beautify: true,
      compress: {
        unused: true,
        drop_console: true,
        drop_debugger: true,
        dead_code: true,
        properties: false,
        warnings: false,
      },
      comments: false
    }),
    new OptimizeJsPlugin({
      sourceMap: false
    })
  ])
  watch = false
}

if (process.env.SHOW === 'yes') {
  plugins = plugins.concat([
    new BundleAnalyzerPlugin({
      // Automatically open analyzer page in default browser
      openAnalyzer: true,
      // Analyzer HTTP-server port
      analyzerPort: 8090
    })
  ])
}

module.exports = {
  watch: watch,
  devtool: devtool,
  entry: entry,
  output: output,
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }],
    postLoaders: [{
      test: /\.async\.jsx?$/,
      loader: 'bundle-loader',
      query: {
        lazy: true,
      },
      exclude: /node_modules/
    }]
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: __dirname,
    alias: alias
  }
}