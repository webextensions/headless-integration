const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'http-pub', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'http-pub', 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    watch: true,
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/env'
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '*',
            '.js',
            '.jsx'
        ]
    }
};
