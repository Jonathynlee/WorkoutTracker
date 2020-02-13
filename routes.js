module.exports = function(app){

    // Our model controllers (rather than routes)
    var application = require('./routes/application');

    var exercise = require('./routes/exercise');
    var workout = require('./routes/workout');

    app.use('/', application);

    app.use('/exercise', exercise);
    app.use('/workout', workout);
    //other routes..
}