const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); // password 암호화 작업
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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

loginSchema.pre('save', async function (next) {
    // 1. 비밀번호 형성 시만 비크립트 형성되도록!
    // express에서 "this"는 module.exports 자체를 의미
    if (!this.isModified('password')) {
        return next();
    }
    // 2. salt생성 => 비밀번호 해쉬(스키마 패스워드, 솔트, 콜백함수)
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(this.password, salt);
        // 3. hash => 스키마 모델 정보에 저장
        this.password = hash;
        next();
    } catch (error) {
        return next(error);
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
        // 에러가 없으면 isMatch를 true
        return isMatchPassword(null, isMatch);
    });
};

// JWT
loginSchema.methods.generateToken = function (isGenerateToken) {
    let user = this;
    console.log('user_id', user._id); // ObjectId

    // 라이브러리 가이드
    // 1.ObjectId 한 단계 감싸기 => toHexString()
    const token = jwt.sign(user._id.toHexString(), 'secretToken');
    // 2. 스키마 모델의 토큰 파라미터 안으로 할당
    user.token = token;
    // 3. 현재 값 user 변수에 저장
    user.save(function (err, user) {
        if (err) return isGenerateToken(err);
        isGenerateToken(null, user); // token 생성
    });
};

// findByToken 매서드 생성
// methods.생성함수 (인스턴스 접근) vs static.생성함수의 차이 (클래스 레벨 접근)
// class level로 만들어서 인스턴스레벨에서 접근 못하도록 접근 제어!
loginSchema.statics.findByToken = function (token, callback) {
    let user = this;
    // Decoded Token
    // 1. Verify
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음
        // 클라이언트에서 가져온 토큰과 DB에 보관 된 토큰이 일치하는지 확인
        user.findOne({ _id: decoded, token: token }, function (err, user) {
            if (err) return callback(err);
            callback(null, user); // 디코드가 성공적으로 되었다면 콜백함수에 결과 값 넣어 줌
            console.log('디코드 이후 user데이터', user);
        });
    });
};

// modeling
const Logins = mongoose.model('logins', loginSchema);

// model exports
const loginSchemas = { Logins: Logins };

module.exports = loginSchemas;
