const { Router } = require('express');
const router = Router();
const handle = require('../handle/user_handle');
const jwt = require('jsonwebtoken');
const secret_key = '123456';
const url = require('url');

router.post('/login', (req, res) => {
    const {user, pwd} =  req.body;
    if (!user || !pwd) {
        res.json({
            code: 400,
            msg: '账号密码不能为空，请重试！',
        });
        return;
    }
    handle.userLogin(user, pwd).then(data => {
        if (data.res) {
            const token = jwt.sign({
                name: user,
                power: data.res.power
            }, secret_key, {
                expiresIn: "7d"
            });
            res.json({
                code: 200,
                msg: '登录成功',
                token
            });
        } else {
            res.json({
                code: 400,
                msg: '账号或密码错误，请重试！',
            });
        }
    });
});


router.get('/getUserData', (req, res) => {
    const {query} = url.parse(req.url,true);
    const page = query['_page'] || 1;
    const limit = query['_limit'] || 10;
    console.log(111);
    handle.selectUserMsg(page, limit)
        .then(data => {
            res.json({
                code: 200,
                userData: data.res,
                page: page,
                limit: limit,
                count: data.count
            });
        })
});


router.post('/changeUserData', (req, res) => {
    const {user, sex, age, tel, email, qq, power} =  req.body;
    const changeData = {user, sex, age, tel, email, qq, power};
    if (!user) {
        res.json({
            code: 400,
            msg: '缺少必传参数'
        })
    }
    const params = {};
    Object.entries(changeData).forEach(([k, v]) => {
        if (v !== undefined && k !== 'user') {
            params[k] = v
        }
    });

    handle.changeUserData(user, params).then(data => {
        if (data.Modified) {
            res.json({
                code: 200,
                msg: '数据修改成功',
                ...data
            })
        } else {
            res.json({
                code: 200,
                msg: '数据修改失败',
                ...data
            })
        }
    })
});

router.post('/deleteUserData', (req, res) => {
    const {user} =  req.body;
    handle.deleteUserData(user).then(data => {
        if (data.deletedCount) {
            res.json({
                code: 200,
                msg: '数据删除成功',
                ...data
            })
        } else {
            res.json({
                code: 400,
                msg: '数据删除失败',
                ...data
            })
        }
    })
});

// 处理token
router.use(async (req, res, next)=>{
    // 取出token
    const auth = req.headers['authorization'];
    if (!auth) {
        res.json({
            code: 400,
            message: '登录过期，请重新登录'
        });
    }
    const token = auth.replace(/Bearer\ /, '');
    // 解开token
    const result = req.JWTtoken = jwt.verify(token, secret_key);

    if(result.iat - result.exp >= 0){
        res.json({
            code: 400,
            message: '登录过期，请重新登录'
        });
    }else{
        const user = await handle.existUser(result.name);
        console.log(result.name);
        if(!user.res){
            res.json({
                code: 400,
                message: '该用户不存在,或账号失效'
            });
        }else{
            next();
        }
    }
});

router.post('/existLogin', (req, res) => {
    const result = req.JWTtoken;

    const token = jwt.sign({
        name: result.name,
        power: result.power
    }, secret_key, {
        expiresIn: "7d"
    });
    handle.getUserMsg(result.name)
        .then(data => {
            res.json({
                code: 200,
                token,
                userData: data.res
            });
        })
});



module.exports = router;