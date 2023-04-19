const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')


module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: {
        popup: './src/popup.jsx',
        background: './src/background.js',
        content: './src/content.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },
    devtool: 'nosources-source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3030,
        compress: true,
        open: true,
        hot: true,
        historyApiFallback: true
    },
    experiments: {
        topLevelAwait: true
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react',],
                    }
                },
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)$/,
                exclude: /node_modules/,
                type: 'asset/resource',
                dependency: {not: ['url']},
                generator: {
                    filename: 'resources/[hash:10][ext][query]'
                }
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new NodePolyfillPlugin(),
        new HtmlWebpackPlugin({
            template: './src/popup.html',
            filename: 'index.html'
        }),
        new CopyPlugin({
            patterns: [
                {from: "public"},
                // {from: "src/background.js"},
                // {from: "src/content.js"}
            ],
        }),


    ],
    resolve: {
        fallback: {
            "fs": false,
            "tls": false,
            "child_process": false,
            "dns": false,
            "readline": false,
            "net": false,
        }
    },
}