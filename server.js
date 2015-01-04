var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

//db.on('error', console.error.bind(console, 'connection error:'));
/*var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name : String,
    todoitems : [{}]
});
var User = mongoose.model('User',UserSchema);*/
/**
db.once('open', function (callback) {
    console.log('successfully opened connection');
});
**/
/*
var name = 'user1';
app.get('/api/todos',function(req,res){
    User.findOne({name:name},function(err,usr){
        if(err) res.send(err);
        var todoitems = (usr && usr.todoitems)||[];
        res.json(todoitems);
    });
});
app.post('/api/todos',function(req,res){
    User.findOne({name:name},function(err,usr){
        if(err) res.send(err);
        usr.todoitems.push({txt:req.body.txt, done:false});
        usr.save(function(err){
            if(err) res.send(err);
            res.json(usr.todoitems);
        });
    });
});

app.get('/api/user/create',function(req,res){
    var user = new User({
        name : 'user1',
        todoitems:[{txt:'invest',done:false},{txt:'join aerobics',done:false}]
    });
    user.save(function(err,usr){
        if(err) res.send(err);
        User.find({name:'user1'},function(err,usr){
            if(err) res.send(err);
            res.json(usr.todoitems);
        });
    });
});

*/



//app.use(express.static(__dirname + '/public'));
/*app.get('*',function(req,res){
    res.sendfile('./public/index.html');
});*/

app.listen(8001);
console.log('App listening on port '+8001);