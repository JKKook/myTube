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
});

app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`);
});
