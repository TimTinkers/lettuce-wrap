const path = require('path')
var rootDir = path.resolve(__dirname)
const CopyPlugin = require('copy-webpack-plugin')

function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    var dts = require('dts-bundle')

    dts.bundle({
      name: 'lettuce-wrap',
      main: rootDir + '/dist/**/*.d.ts',
      out: rootDir + '/dist/index.d.ts',
      removeSource: true,
      outputAsModuleFolder: true,
    })
  })
}

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'lettuce-wrap',
    libraryTarget: 'umd',
  },
  plugins: [new DtsBundlePlugin(), new CopyPlugin([{ from: 'ethminer', to: 'ethminer' }])],
}
