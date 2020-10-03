const express = require('express');
const app = express();
const port = 5000;
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key')
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({extended: true}));  // application/x-www-form-urlencoded 형식을 분석
app.use(bodyParser.json());  // json 형식을 분석
app.use(cookieParser());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => console.log("MongoDB is  connected !!"))
    .catch(err => console.log(err))



app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요 서버입니다 후후~")
})

app.post('/api/users/register', (req, res) => {
    // 화원가입에 필요한 정보들을 client에서 가져오면 그것들을  DB에 넣어준다
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    // 이메일을 DB에서 찾음
    User.findOne({ email: req.body.email }, (err, user) => {
        // 이메일에 해당하는 비번이 맞는지 확인
        // 없으면 에러처리
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        // 있으면 다음 함수실행
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) 
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
            
            // 비번에 맞으면 토큰 생성         
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                // 토큰을 저장한다
                res.cookie('x_auth', user.token) // x_auth : 쿠키가들어감
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            })
        })

    })
})

// auth -> 미들웨어
app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
        { token: '' },
        (err, user) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
})



app.listen(port, () => {
    console.log(`Example app listening at ${port}! yayy`);
})