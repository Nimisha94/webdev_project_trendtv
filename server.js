var app = require('./express');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
//var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

app.use(session({
    secret: 'secret'
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// require ("./test/app.js")(app);

var port = process.env.PORT || 4000;

require("./project/app");
app.listen(port);