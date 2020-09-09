const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    // 在 开发环境 开启source-map，源代码定位 ,可以方便调试代码，在生产环境就不需要开启了，防止源代码暴露
    // ‘source-map’  'inline-source-map' 'cheap-source-map' 'eval' ''
    devtool: 'inline-source-map',
    devServer: {
        // 默认 localhost
        host: 'localhost',
        port: 9000,
        // 实现实时更新，
        // 告诉dev server 在哪里查找文件
        contentBase: './dist',
        // 启动 HMR 热替换
        // 允许在运行时更新各种模块，而无需进行完全刷新
        hot: true,
        // 处理页面强制刷新时路由页面404问题
        historyApiFallback: true,
        // 配置easymock代理
        proxy: {
            "/api":{
                changeOrigin: true,
                target: "https://www.easy-mock.com/mock/5c24adb39a96a934e48de313"
            },
            "/node": {
                changeOrigin: true,
                pathRewrite: {'^/node' : ''}, // 可转换
                target: "http://localhost:3000"
            }
        }
    },
    plugins: [
        // 热替换
        new webpack.HotModuleReplacementPlugin(),
    ],
    // 启用相应模式（development,production）下的webpack内置的优化
    mode: 'development'
})