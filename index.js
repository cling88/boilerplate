const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://cling88:cling88@boilerplate.zyxrr.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => console.log("MongoDB is  connected !!"))
    .catch(err => console.log(err))



app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Example app listening at ${port}`);
})