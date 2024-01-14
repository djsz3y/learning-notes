const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin') // 10-14

module.exports = smart(webpackCommonConf, {
  mode: 'development',
  // 10-14 加entry
  entry: {
    // index: path.join(srcPath, 'index.js')
    index: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      path.join(srcPath, 'index.js')
    ],
    other: path.join(srcPath, 'other.js')
  },
  module: {
    rules: [
      // 10-13
      // babel-loader从common移动到dev
      {
        test: /\.js$/,
        loader: ['babel-loader?cacheDirectory'], // 10-11 ?cacheDirectory
        include: srcPath,
        exclude: /node_modules/
      },
      // 直接引入图片 url
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 'file-loader'
      },
      // 处理css，从common移动到dev。
      {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        loader: ['style-loader', 'css-loader', 'postcss-loader'] // 加了 postcss
      },
      // 处理less，从common移动到dev。
      {
        test: /\.less$/,
        // 增加 'less-loader'，注意顺序
        loader: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // window.ENV = 'development'
      ENV: JSON.stringify('development')
    }),
    // 10-14
    new HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8080,
    progress: true, // 显示打包的进度条
    contentBase: distPath, // 根目录
    open: true, // 自动打开浏览器
    compress: true, // 启动 gzip 压缩

    // 10-14
    hot: true,

    // 设置代理
    proxy: {
      // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
      '/api': 'http://localhost:3000',

      // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      '/api2': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api2': ''
        }
      }
    }
  }
})
