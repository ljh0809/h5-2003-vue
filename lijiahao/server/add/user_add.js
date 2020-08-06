const user = require('../model/user');
const Mock = require('mockjs');
const Random = Mock.Random;

const data = Mock.mock({
    'user|50': [{
        name: '@cname',
        pwd: 123,
        'sex|1': ['男', '女'],
        'age|18-30': 0,
        tel: /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/,
        email: '@email()',
        qq: /\d{5,11}/,
        'power|1': [
            '普通用户',
            '普通用户',
            '普通用户',
            '普通用户',
            '普通用户',
            '普通用户',
            '普通用户',
            '普通用户',
            '管理员',
            '超级管理员'
        ],
        registerTime: new Date().getTime()
    }]
});
data.user.forEach(item => {
    new user(item).save();
});



