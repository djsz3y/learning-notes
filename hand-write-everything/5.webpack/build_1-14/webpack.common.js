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
