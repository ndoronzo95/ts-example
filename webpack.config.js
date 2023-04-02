const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './index.ts',
    module: {
        rules: [
            {
              test: /\.ts?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
            {
                test: /\.css?$/,
                use: ['style-loader','css-loader'],
                exclude: /node_modules/,
              },
          ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.css']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '')
    },
    plugins: [new HtmlWebpackPlugin()],
    devServer: {
        static: './dist'
    }
}