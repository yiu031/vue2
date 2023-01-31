const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 批量处理打包后的map文件，使文件中不在含有map文件
  productionSourceMap: false,
  // 关闭eslint校验工具
  lintOnSave: false,
  // 解决跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' }, // 路径重写（这里不需要）
      },
    },
  },
})
