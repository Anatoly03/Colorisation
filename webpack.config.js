const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/js/app.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'json-loader',
                type: 'javascript/auto',
            },
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: [{ loader: 'ts-loader' }],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.mp3$/,
                exclude: /node_modules/,
                use: [{ loader: 'file-loader' }],
            },
            {
                test: /\.(png|svg|jp(e*)g|gif)$/,
                type: 'asset/resource',
                exclude: /node_modules/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets',
                },
                {
                    from: 'src/style.css',
                    to: 'style.css',
                },
            ],
        }),
    ],
}
