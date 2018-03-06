var passport = require('passport');
var flash = require('connect-flash');
require('../config/passport')(passport);


exports.login_get=function(req,res,next){
    res.render('login',{message:req.flash('loginMessage')});
}

exports.login_post=passport.authenticate('local-login',{
    successRedirect:'/catalog',
    failureRedirect:'/',
    failureFlash:true,
});

exports.signup_get=function(req,res,next){
    res.render('signup',{message:req.flash('signupMessage')});
}

exports.signup_post=passport.authenticate('local-signup',{
    successRedirect:'/catalog',
    failureRedirect:'/signup',
    failureFlash:true,
});

exports.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}  

exports.logout_get = function(req,res,next){
    req.logout();
    res.redirect('/');
}