const express = require('express');
const server = express();
const mongoose = require('mongoose');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');

mongoose.connect('mongodb://localhost:27017/backstage', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    // 添加数据
    // require('./add/product_add');  // 添加商品列表数据
    // require('./add/user_add');  // 添加用户

    // 处理数据请求
    server.use(express.json());
    server.use(express.urlencoded());

    // API请求
    server.use('/api/product', require('./router/productRouter'));
    server.use('/api', require('./router/userRouter'));
    server.use('/images', express.static('./images'));

    // 页面
    server.use('/', express.static(path.join(__dirname, '/dist')));

    // 响应404
    server.use((req, res, next) => {
        res.status(404);
    });

    // 错误处理
    server.use((err, req, res, next) => {
        res.status(500)
    });
    const options = {
        key: fs.readFileSync(path.resolve('./key/4046795_www.lijiahao888.top.key')),//指向key
        cert: fs.readFileSync(path.resolve('./key/4046795_www.lijiahao888.top.pem')),
    };
    https.createServer(options, server).listen(443);

    http.createServer((req,res)=>{
        res.writeHead(301, {'Location': 'https://localhost/'});
        res.end();
    }).listen(80);
});
