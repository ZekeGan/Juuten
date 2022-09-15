const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: "development", // production development
    entry: {
        popup: './src/popup.jsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "popup.js"
    },
    devServer: {
        static: {
          directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        compress: true,
        open: true,
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [{
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react',],
                }
            },
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/popup.html',
            filename: 'index.html'
        }),
        new CopyPlugin({
            patterns: [
                {from: "public"},
                {from: "src/background.js"},
                {from: "src/content.js"}
            ],
        }),
    ]
}