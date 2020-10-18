/*
// Require packages
*/


const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


/*
// Declare App
*/


const app = express();


/*
// Set up Packages
*/


app.use(bodyParser.urlencoded( { extended: false } ));
app.use(cookieParser());
app.set('view engine', 'pug');


/*
// Routes
*/


app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello');
    }
});

app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?", hint: "Think about whose tomb it is" });
});


/*
// Other Middleware
*/


app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status = err.status;
    res.render('error');
});

app.listen(3000, () => {
    console.log('The app is running =at localhost:3000');
});