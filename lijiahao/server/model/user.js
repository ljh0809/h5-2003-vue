const mongoose = require('mongoose');

module.exports = mongoose.model('user', {
    name: String,
    pwd: String,
    sex: String,
    age: Number,
    tel: String,
    email: String,
    qq: String,
    power: String,
    registerTime: String
});