const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWepackPlugin = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

/**
 * 开发环境(development)和生产环境(production)的构建目标差异很大。
 * 在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)
 * 或热模块替换(hot module replacement)能力的 source map 和 localhost server。
 * 而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。
 * 由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。
 */

module.exports = {
    // entry: './src/index.js',
    // entry: {
    //     app: './src/index.js',
    //     print: './src/print.js'
    // },
    entry: {
        app: './src/index.js'
    },
    output: {
        // filename: 'bundle.js',
        // 根据入口起点名称动态生成bundle名称
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        // 使用静态资源路径 CDN  /表示不使用
        publicPath: '/'
    },
    // 代码分割按需加载、提取公共代码；每个页面单独打包自己的js，就可以在进入页面时候再加载自己 的js，首屏加载就可以快很多
    optimization: {
        splitChunks: {
            chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
        },
    },
    plugins: [
        new HtmlWebpackPlugin({template:'./public/index.html'}),
        // 默认会删除output指定的输出目录
        new CleanWepackPlugin(),
        // 抽取css文件，提高打包效率，单独生成css,css可以和js并行下载
        // new MiniCssExtractPlugin({
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // })
    ],
    // 添加resolve
    resolve: {
        // 指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配
        extensions: ['.ts', '.tsx', '.js'],
         //配置别名可以加快webpack查找模块的速度
        alias: {
            "@": path.join(__dirname, "src"),
            pages: path.join(__dirname, "src/pages"),
            // router: path.join(__dirname, "src/router")
        }
    },
    module: {
        rules: [
            { 
                test: /\.jsx?$/,  
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader'
                } 
            },
            // 增加ts-loader
            {
                test: /\.tsx?$/,
                loaders: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
}