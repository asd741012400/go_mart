module.exports = {
  //...
  baseUrl: "./",
  devServer: {
    proxy: {
        '/api': {
            target: 'http://27.14.90.211:93/',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
              '^/api': '/api'
            }
        }
    }
  }
  //...
};
