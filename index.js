const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

//route middleware
const authRoute = require('./routes/authentication/auth');
const postRoute = require('./routes/post');

dotenv.config();

// create connection to db
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true
}, () => {
    console.log('connected to db')
});

// app.use(bodyParser.urlencoded({
//     extended: false
// }));
app.use(express.json());

const port = 6000;


app.use('/user', authRoute);
app.use('/user', postRoute);

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
})