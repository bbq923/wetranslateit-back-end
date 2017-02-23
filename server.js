var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Page = require('./models/page');
var auth = require('./controllers/auth');
var message = require('./controllers/message');
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');
var page = require('./controllers/page');
var translation = require('./controllers/translation');

//Middleware
app.use(bodyParser.json());
app.use(cors);


//Requests
app.get('/api/message', message.get);

app.post('/api/message', checkAuthenticated, message.post);

app.post('/auth/register', auth.register);

app.post('/auth/login', auth.login);

app.post('/api/search', page.search);

app.get('/api/search', page.get);

app.post('/api/save', page.save);

app.post('/api/show', page.show);

app.post('/api/translate', translation.translate);

//Connection
mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
    if(!err) {
        console.log("we are connected to mongo");
    }
})

var server = app.listen(5000, function() {
    console.log('listening on port ', server.address().port);
});