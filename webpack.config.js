const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './index.js',
    devServer: {
        historyApiFallback: true,
        port: '3000',
        disableHostCheck: true,
        hot: true,
        host: 'localhost'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.css', '.scss']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.[hash].js',
    },
    plugins: [
        new CopyPlugin([
            path.resolve(__dirname, "public")
        ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        })
    ]
};