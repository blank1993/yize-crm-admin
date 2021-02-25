const path = require('path');

module.exports = {
  devServer: {
    progress: false, // 显示打包进度
    port: 8090,
  },
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        component: path.join(__dirname, 'src/components'),
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/variables.scss";',
      },
    },
  },
  transpileDependencies: ['vue-data-tables'],
};
