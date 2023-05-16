// initial settings
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 8005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect Mongoose
mongoose
    .connect(process.env.MONGO_ATLAS_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('monogoose connect..');
    })
    .catch((err) => {
        console.log(err);
    });

// import Schemas
const { Logins } = require('./model/loginSchemas');

// POST 회원가입 페이지
app.post('/users/register', async (req, res) => {
    try {
        // client에서 로그인 정보 가져오기
        const loginInfo = new Logins(req.body);
        console.log('loginInfo:', loginInfo);
        // client에서 받아온 로그인 정보 정보
        const loggedStatus = await loginInfo.save();

        if (!loggedStatus) {
            const error = new Error('POST 요청이 실패했습니다');
            return res.status(400).json({ success: 'something wrong', error });
        }
        return res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).send(err);
        console.log(`문법에 오류가 있군요!`);
    }
});

// POST 로그인 페이지
app.post('/users/login', async (req, res) => {
    console.log('request', req.body);

    try {
        // 1. 요청 된 이메일을 데이터베이스에서 찾기
        const userEmail = await Logins.findOne({ email: req.body.email });
        // 1-1 이메일 모델 저장
        const isEmail = await userEmail.save();

        if (!isEmail) {
            return res.json({
                loginStatus: false,
                message: '이메일이 존재하지 않습니다',
            });
        } else {
            // 2. 이메일을 데이터베이스에서 찾았다면 비밀번호 비교
            // 스키마 모델에서 비밀번호 비교 메서드 생성하자
            userEmail.comparePassword(+req.body.password, (isMatch) => {
                console.log('plainPassword', req.body.password);
                if (!isMatch) {
                    return res.json({
                        loginStatus: false,
                        message: '비밀번호가 일치하지 않습니다',
                    });
                } else {
                    // 3. 비밀번호가 일치하다면 JWT 토큰 생성
                    res.send('로그인 성공');
                }
            });
        }
    } catch (error) {}
});

app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`);
});