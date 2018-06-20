const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:3333',
            'webpack/hot/only-dev-server',
            'babel-polyfill',
            './src/index.js'
        ]
    },
    output: {
        publicPath: '/',
        filename: 'js/[name].js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.DefinePlugin({
            APP: {
                API: {
                    URL: JSON.stringify('http://localhost:8888'),
                    DEVICE: JSON.stringify('/device'),
                    VERSION: JSON.stringify('1.0.0')
                },
                CLIENT: {
                    VERSION: JSON.stringify('1.0.0')
                },
                LOG: {
                    LEVEL: JSON.stringify('DEBUG')
                }
            }
        })
    ],
    module: {
        rules: [{
            test: /\.(js)$/,
            use: 'babel-loader',
            include: path.join(__dirname, 'src'),
        }, {
      test: /\.css$/,
      use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
        use: 'css-loader'
      })),
    },]
    }
};
