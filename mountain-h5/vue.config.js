const path = require('path')
module.exports = {
  // baseUrl: '/',
  outputDir: 'dist',
  devServer: {
    port: 6161,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    contentBase: path.join(__dirname, 'static')
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      // 增加环境变量
      // Object.assign(args[0]['process.env'], { 'APP_ICO': 'true' })
      return args
    })
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "@/assets/css/global.scss";`
      }
    }
  }
}