const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true, // 문자열 내에 스페이스바 없애기
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    role: {
        type: Number,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        // 토큰 유효기간
        type: Number,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
