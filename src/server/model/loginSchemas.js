const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); // password 암호화 작업
const saltRounds = 10;

const loginSchema = new Schema({
    // _id : objectId
    nickName: { type: String, maxlength: 20 },
    email: { type: String, trim: true, require: true, unique: 1 },
    password: { type: String, trim: true, minlength: 5, require: true },
    token: { type: String },
    entryDate: { type: Date, default: Date.now },
});

// 비밀번호 암호화 (비크립트 라이브러리), 일종의 middleWare
// https://www.npmjs.com/package/bcrypt

loginSchema.pre('save', function (next) {
    let user = this; // express에서 "this"는 module.exports 자체를 의미
    // 1. 비밀번호 형성 시만 비크립트 형성되도록!
    if (user.isModified('password')) {
        // 2. salt생성 => 비밀번호 해쉬(스키마 패스워드, 솔트, 콜백함수)
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);
            // 3. 생성된 해쉬 DB에 저장
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        // password 항목이 아닐 시, 해당 로직 통과
        next();
    }
});

// comparePassword 메서드 생성
loginSchema.methods.comparePassword = function (
    plainPassword,
    isMatchPassword,
) {
    // plainPassword를 암호화 => 스키마 속 패스워드와 일치 여부 파악
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        console.log(
            '입력받은비번:',
            plainPassword,
            '저장된비번:',
            this.password,
        );
        if (err) return isMatchPassword(err);
        return isMatchPassword(null, isMatch);
    });
};

// modeling
const Logins = mongoose.model('logins', loginSchema);

// model exports
const loginSchemas = { Logins: Logins };

module.exports = loginSchemas;
