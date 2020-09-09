const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CleanWepackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin') // 引入 PWA 插件

const prodConfig = {
  plugins: [
    // 配置 PWA
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
}

module.exports = merge(common, {
    // 调试源码(debug)和运行基准测试(benchmark tests)
    // 会生成app.bundle.js.map
    // devtool: 'source-map',
    plugins: [
        new CleanWepackPlugin(['dist']),
        // 在生产环境时，可以用来对js文件进行压缩，从而减小js文件的大小，加速load速度
        // 但在开发环境不建议使用，因为会拖慢webpack的编译速度
        new UglifyJSPlugin({
            sourceMap: true
        }),
        // 指定环境,定义环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    // 启用相应模式（development,production）下的webpack内置的优化
    mode: 'production'
});