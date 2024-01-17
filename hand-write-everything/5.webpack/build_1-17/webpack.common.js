const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
  // 10-6
  // entry: path.join(srcPath, 'index'),
  // 修改为
  entry: {
    index: path.join(srcPath, 'index.js'),
    other: path.join(srcPath, 'other.js')
  },
  module: {
    rules: [
      // babel-loader
      // // 10-13
      // // babel-loader从common移动到dev
      // {
      //   test: /\.js$/,
      //   loader: ['babel-loader?cacheDirectory'], // 10-11 ?cacheDirectory
      //   include: srcPath,
      //   exclude: /node_modules/
      // }
      // 注释vue
      // {
      //   test: /\.vue$/,
      //   loader: ['vue-loader'],
      //   include: srcPath
      // },
      // {
      //     test: /\.css$/,
      //     // loader 的执行顺序是：从后往前（知识点）
      //     loader: ['style-loader', 'css-loader']
      // },
      // // 处理css，从common移动到dev。
      // {
      //   test: /\.css$/,
      //   // loader 的执行顺序是：从后往前
      //   loader: ['style-loader', 'css-loader', 'postcss-loader'] // 加了 postcss
      // },
      // // 处理less，从common移动到dev。
      // {
      //   test: /\.less$/,
      //   // 增加 'less-loader'，注意顺序
      //   loader: ['style-loader', 'css-loader', 'less-loader']
      // }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.join(srcPath, 'index.html'),
    //   filename: 'index.html'
    // }) // 注释。

    // 10-6
    // 多入口 - 生成 index.html
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
      // 10-8
      chunks: ['index', 'vendor', 'common'] // 只引用 index.js -> 要考虑代码分割
    }),
    // 10-6
    // 多入口 - 生成 other.html
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'other.html'),
      filename: 'other.html',
      // 10-8
      chunks: ['other', 'common'] // 只引用 other.js -> 要考虑代码分割
    })
  ]
}
