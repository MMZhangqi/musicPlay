const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/mixin.scss";
          @import "@/assets/scss/variable.scss";
        `
      }
    }
  },
  devServer: {
    proxy: 'http://localhost:3000'
  }
})
