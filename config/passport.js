var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
module.exports=function(passport){
    //serialize user function
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

    //deserialize user function
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        });
    });
    //local signup using passport.use
    passport.use('local-signup',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },
    function(req,email,password,done){
        //asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function(){
            //find the user with email
            User.findOne({'email':email},function(err,user){
                //if there any errors return the error
                if(err)
                    return done(err);
                
                //check to see if there is any user with that email
                if(user){
                    return done(null,false,req.flash('signupMessage','That email is already taken'));
                }else{
                    var newUser=new User();

                    //set the user credentials
                    newUser.email=email;
                    newUser.password=newUser.generateHash(password);

                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null,newUser);
                    });
                };
            });
        });
    }));
    passport.use('local-login',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true,
    },
    function(req,email,password,done){
        //asynchronous
        User.findOne({'email':email},function(err,user){
            //if there are any errors return errors before anything else
            if(err)
                return err;
            //if user with that email not found give the message
            if(!user)
                return done(null,false,req.flash('loginMessage','User not found!'));
            if(!user.validPassword(password))
                return done(null,false,req.flash('loginMessage','Oops! wrong Password'));
            //all is well return the successful user
            return done(null,user);
        });
    }));
}