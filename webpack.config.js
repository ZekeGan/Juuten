const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')


module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: {
        popup: './src/popup.jsx',
        content: './src/content.js',
        background: '/src/background.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "src/[name].js",
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3030,
        compress: true,
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    // optimization: { // inactive this when build
    //     runtimeChunk: 'single',
    // },
    experiments: {
        topLevelAwait: true,
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env', '@babel/preset-react',], },
                },
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)$/i,
                type: 'asset/resource',
                generator: { filename: 'src/asset/font/[name][ext][query]' },
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
                generator: { filename: 'src/asset/image/[name][ext][query]' },
            },
        ]
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/popup.html',
            filename: 'index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: "public/manifest.json" },
                { from: "public/icon", to: "src/asset/icon" },
                { from: "src/assets/content.css", to: 'src' }
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