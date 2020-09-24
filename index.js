const express = require('express');
const app = express();
const port = 3000;
const { User } = require('./models/User');
const bodyParser = require('body-parser');
const config = require('./config/key')
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));  // application/x-www-form-urlencoded 형식을 분석
app.use(bodyParser.json());  // json 형식을 분석


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

app.post('/register', (req, res) => {
    // 화원가입에 필요한 정보들을 client에서 가져오면 그것들을  DB에 넣어준다
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at ${port}! yayy`);
})