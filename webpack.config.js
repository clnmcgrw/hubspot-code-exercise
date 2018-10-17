const webpack = require('webpack');

module.exports = (options, paths) => {
  
  const plugins = [];
  if (options.production) {
    const defPlug = new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    });
    plugins.push(defPlug);
  }

  return {
    entry: ['@babel/polyfill', './' + paths.js.entry],
    
    output: {
      filename: paths.js.filename,
      path: __dirname + '/' + paths.js.output
    },
    
    mode: options.production ? 'production' : 'development',
   
    module: {
      rules: [{
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": {
                  "browsers": options.browserlist
                }
              }],
              '@babel/preset-react'
            ],
            plugins: ["@babel/plugin-transform-regenerator"]
          }
        }
      }]
    },
    
    plugins
  };
};