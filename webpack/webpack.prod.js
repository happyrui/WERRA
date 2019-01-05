const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CleanWepackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    // 调试源码(debug)和运行基准测试(benchmark tests)
    // 会生成app.bundle.js.map
    // devtool: 'source-map',
    plugins: [
        new CleanWepackPlugin(['dist']),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    // 启用相应模式（development,production）下的webpack内置的优化
    mode: 'production'
});