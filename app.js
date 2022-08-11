const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Import Routes
const postsRoute = require('./routes/posts');
const subjectsRoute = require('./routes/subject');
const auth = require('./routes/auth');

//Middlewares
// app.use('/posts', () => {
//     console.log('This is middleware running');
// })
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRoute);
app.use('/subjects', subjectsRoute);
app.use('/auth', auth);

//ROUTES
app.get('/',(req, res) => {
    res.send('We are on home');
});



//Connect To DB
mongoose.connect(process.env.DB_connection, () =>
    console.log('connected to DB!')
);


//HOW TO WE START LISTENING TO THE SERVER
app.listen(3000);

//Vi99mU12Na18rM12
//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