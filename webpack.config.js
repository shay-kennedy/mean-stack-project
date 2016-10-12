var webpack = require('webpack'),
  path = require('path');

module.exports = {
  // Tells webpack where are app source code lives
  context: __dirname + '/app',
  // First file that webpack should load, the main file
  entry: {
    app: './app.js',
    vendor: ['angular']  
  },
  // This is where our bundle will go when webpack is done
  output: {
    path: __dirname + '/public/scripts',
    filename: 'resource.bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  ]
};