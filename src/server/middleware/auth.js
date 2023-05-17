// 로그인 미들웨어

const { Logins } = require('../model/loginSchemas');

let isLoggedIn = (req, res, next) => {
    // 인증 처리
    // 1.클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    // 2.토큰을 decoded한 후, 유저를 DB에서 찾는다.
    Logins.findByToken(token, (err, user) => {
        if (err) throw new Error(`Token을 찾을 수 없습니다. ${err}`);
        if (!user) return res.json({ isAuth: false, error: true });

        // 토큰을 찾았다면 서버에서 해당 토큰과 유저 정보를 찾을 수 있도록 할당해주자
        req.token = token;
        req.user = user;
        next();
    });
    // 서버에서 유저가 있다면 인증!, 유저가 없다면 인증하지 않음!
};

module.exports = { isLoggedIn };
