const { User } = require('../models/User');

 // 인증처리를 하는곳
let auth = (req, res, next) => {
   // 클라이언트에서 쿠키에서 토크을 가져옴 ( cookie-parser 사용 )
   let token = req.cookies.x_auth;

   // 토큰을 복호화 한후 유저를 찾는다
   User.findByToken(token, (err, user) => {
       if(err) throw err;
       if(!user) return res.json({ isAuth: false, error: true })
       req.token = token;
       req.user = user;
       next();
   })

   // 유저가 있으면 인증 OKAY
   // 유저가 없으면 인증 NO
}

module.exports = { auth };