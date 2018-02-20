var BookInstance=require('../models/bookinstance');
var Book = require('../models/book');
var async=require('async');

//Display a list of all book instances
exports.bookinstance_List=function(req,res,next){
    BookInstance.find()
    .populate('book')
    .exec(function(err,list_bookinstances){
        if(err){return next(err)}
        //successfull so render
        res.render('bookinstance_list',{title:'Book Instance List',bookinstance_list:list_bookinstances});
    });
};

//Display details of a specific book intance
exports.bookinstance_Detail=function(req,res,next){
            BookInstance.findById(req.params.id)
            .populate('book')
            .exec(function(err,book_instance){
                if(err){return next(err);}
                if(book_instance==null){
                    var err=new Error('Copy not found');
                    err.status=404;
                    return next(err);
                }
                //the query was successful
                res.render('bookinstance_detail',{title:'Book Instance Detail',bookInstance:book_instance})
            });
};

//Display bookintance create form  GET
exports.bookinstance_create_get=function(req,res){
    res.send('NOT IMPLEMENTED: Bookinstance create get');
};

//Handle bookintance create form POST
exports.bookinstance_create_post=function(req,res){
    res.send('NOT IMPLEMENTED: Bookinstnace create post');
}

//Display bookinstance delete form GET
exports.bookinstance_delete_get=function(req,res){
    res.send('NOT IMPLEMENTED: Bookinstance delete get');
};

//Handle bookinstance delete form POST
exports.bookinstance_delete_post=function(req,res){
    res.send('NOT IMPLEMENTED: bookinstance delete post');
};

//Display bookinstance update form GET
exports.bookinstance_update_get=function(req,res){
    res.send('NOT IMPLEMENTED: Bookinstance update get');
};

//Handle bookinstance update forM post
exports.bookinstance_update_post=function(req,res){
    res.send('NOT IMPLEMENTED: Bookinstance update post');
}

