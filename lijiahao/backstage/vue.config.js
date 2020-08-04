module.exports = {
    devServer:{
        proxy:{
            'api': {
                target:'http://localhost:3000/api/product',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}