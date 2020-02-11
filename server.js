const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const passport = require("./config/passport");
const config = require("./config/extra-config");


const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


app.set('views', path.join(__dirname, 'views'));

//set up handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

const isAuth = require("./config/middleware/isAuthenticated");
const authCheck = require('./config/middleware/attachAuthenticationStatus');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: config.sessionKey, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(authCheck);





mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutDB", {
    useNewUrlParser: true,
    useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
