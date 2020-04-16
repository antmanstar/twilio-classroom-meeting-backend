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
let classroomPublic = require('./routes/classroomPublic.js');
let classroomPrivate = require('./routes/classroomPrivate.js');
let classroomWebhook = require('./routes/classroomWebhook.js');
let chatPrivate = require('./routes/chatPrivate.js');

/* CLI Arguments */
let parseArgs = require('minimist')

/* Port */

let port;

if (process.env.NODE_ENV == 'dev' || true) {
    var args = parseArgs(process.argv.slice(2), { port: 'port' });
    if (args.port == undefined) {
        throw new Error("To start microservice, must define PORT argument. --port <num>");
    }
    port = args.port;
} else if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'acceptance') {
    port = 8080;
} else if (process.env.NODE_ENV == 'prod') {
    require('newrelic');
    port = 80;
} else {
    throw new Error("Set up development variable. 'dev', 'test', 'acceptance', 'prod'");
}

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
app.use('/classroom', classroomWebhook);
app.use('/classroom', classroomPublic);
app.use('/classroom', classroomPrivate);
app.use('/classroom', chatPrivate);

/* Start API */
app.listen(port, function() {
    console.log('# Running on port ' + port + ' #');
})

module.exports = app;