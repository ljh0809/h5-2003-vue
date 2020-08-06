const user = require('../model/user');
module.exports.userLogin = async (name, pwd) => {
    const res = await user.where({name, pwd}).findOne();
    return {
        res
    };
};
module.exports.existUser = async (name) => {
    const res = await user.where({name}).findOne();
    return {
        res
    };
};
module.exports.getUserMsg = async (name) => {
    let res = await user.where({name}).findOne({}, {_id: false, __v: false});
    return {
        res
    };
};
module.exports.selectUserMsg = async (page, limit) => {
    limit = Number(limit);
    const count = await user.countDocuments();
    const res = await user.find({},{_id: false, __v: false}).skip((page - 1) * limit).limit(limit);
    return {
        count,
        res
    };
};
module.exports.changeUserData = async (name, params) => {
    console.log(params);
    const res = await user.updateOne({
        name: name
    }, {
        sex: params.sex,
        age: params.age,
        tel: params.tel,
        email: params.email,
        qq: params.qq,
        power: params.power
    });
    return {
        matched: res.n,
        Modified: res.nModified
    };
};
module.exports.deleteUserData = async(name) => {
    let res = null;
    if (/\[/.test(name)) {
        name = JSON.parse(name.replace(/'/g, '"'));
    }
    if (name instanceof Array) {
        res = await user.deleteMany({name: {$in: name}})
    } else {
        res = await user.remove({name});
    }
    return {
        deletedCount: res.deletedCount
    }
};