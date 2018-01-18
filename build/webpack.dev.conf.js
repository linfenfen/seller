'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
//vue2.0没有dev-server.js   express模拟后台也在webpack。dev。config。js中进行
//添加开始 express起一个后台
// const express=require('express')
// const app=express()
// var appData=require('../data.json')
// var seller=appData.seller
// var goods=require('../categories.json').data
// var ratings=appData.ratings

// var apiRoutes=express.Router()
// app.use('/api',apiRoutes);
//添加结束 get请求在devServer中添加  post请求如下
/*#webpack.dev.conf.js
apiRoutes.post('/foods', function (req, res) { //注意这里改为post就可以了
  res.json({
    error: 0,
    data: foods
  });
})
// 在组件里面
#...vue
created () {
 this.$http.post('http://localhost:8080/api/foods').then((res) => {
  console.log(res)
 })
}*/



const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },//mook数据  注意：浏览器中路径不要带#！！
    // before(app) {
    //   app.get('/api/seller',(req,res)=>{
    //     res.json({
    //       errno:0,
    //       data:seller
    //     })
    //   })
    //   app.get('/api/goods',(req,res)=>{
    //     res.json({
    //       code:0,
    //       data:goods
    //     })
    //   })
    //   app.get('/api/ratings',(req,res)=>{
    //     res.json({
    //       errno:0,
    //       data:ratings
    //     })
    //   })
    // }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
