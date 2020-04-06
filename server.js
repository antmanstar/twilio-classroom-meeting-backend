/* Express */
let express = require('express')
let app = express()

/* Packages */
//let newrelic = require('newrelic');
let compression = require('compression')
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cors = require('cors');

/* Routes */
let routesPublic = require('./routes/classroomPublic.js');
let routesPrivate = require('./routes/classroomPrivate.js');

/* CLI Arguments */
let parseArgs = require('minimist')

let port = process.env.PORT || 8080;

/* End CLI Arguments */

/* Configs */
let config = require('config');

/* Database options */
let options = { useNewUrlParser: true, useUnifiedTopology: true };

/* Database */
mongoose.connect(config.DBHost, options)
let db = mongoose.connection;

/* Mongoose fix depreciation promise */
mongoose.Promise = Promise;

/* Database # Error Handling */
db.on('error', console.error.bind(console, 'connection error:'));

/* Testing environment */
if (config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

/* app.use # packages */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(compression());
app.use(cors());

/* app.user custom modification */

/* Accounts routes */
app.use('/classroom', routesPublic);
app.use('/classroom', routesPrivate);

/* Start API */
app.listen(port, function() {
    console.log('# Running on port ' + port + ' #');
})

module.exports = app;