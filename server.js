const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const logger = require('morgan');
const session = require('express-session');




const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));



app.set('views', path.join(__dirname, 'views'));

//set up handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');





mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutDB", {
    useNewUrlParser: true,
    useFindAndModify: false
});

// routes
require('./routes')(app);

 

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

module.exports = app;