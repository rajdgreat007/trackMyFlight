var login = require('./login');
var signup = require('./signup');
var User = require('../models/user');

module.exports =  function(passport){
  passport.serializeUser(function(user,done){
      done(null,user._id);
  });
  passport.deserializeUser(function(id,done){
      User.findById(id,function(err,user){
          done(err,user);
      });
  });
  //setting strategies
  login(passport);
  signup(passport);

};