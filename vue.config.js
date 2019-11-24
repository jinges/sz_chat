var proxy=null;
if(process.env.VUE_APP_MODE=='development'){
    proxy={
        '/other': {
            target:process.env.VUE_APP_SERVER_URL,
            changeOrigin: true,
            pathRewrite: {
                '^/other': ''
            }
        },
        '/api': {
            target:process.env.VUE_APP_SERVER_URL,
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
}
module.exports = {
    devServer: {
        proxy: proxy
    }
}
