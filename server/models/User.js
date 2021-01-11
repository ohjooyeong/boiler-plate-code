const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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

// userSchema에 save하기전에 이 함수를 실행한다.
userSchema.pre('save', function (next) {
    var user = this; // userSchema를 가르킴

    // password가 바뀔때만 암호화 해준다.
    if (user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function (cb) {
    var user = this;
    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    // 토큰을 decode한다.
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ _id: decoded, token: token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
