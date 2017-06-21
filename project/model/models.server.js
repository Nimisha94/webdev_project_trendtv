var mongoose = require("mongoose");

var connectionString = 'mongodb://127.0.0.1:27017/webdev_project_trendtv';

if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;