var proxy=null;
if(process.env.VUE_APP_MODE=='development'){
    proxy={
            '/api': {
                target:process.env.VUE_APP_SERVER_URL,
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
