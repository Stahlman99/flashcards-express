/*
// Require resources
*/


const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');


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

app.use(mainRoutes);
app.use('/cards', cardRoutes);


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