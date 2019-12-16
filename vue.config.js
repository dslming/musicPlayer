const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProduction = process.env.NODE_ENV === 'production'
const version = "1.0.0"
const Timestamp = new Date().getTime();
console.error("version:", version, "isProduction:", isProduction);

module.exports = {
  runtimeCompiler: true,
  publicPath: './',

  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src/'))
  },
  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${version}.${Timestamp}.js`,
      chunkFilename: `[name].${version}.${Timestamp}.js`
    }
  },
  devServer: {
    host: '0.0.0.0',
    open: true,
    port: 9999,
    proxy: {
      '/resources': {
        target: 'https://dslming.com/',
        secure: false,
        changeOrigin: true
      }
    }
  },
}
