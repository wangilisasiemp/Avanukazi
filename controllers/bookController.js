var Book=require('../models/book');
var Author=require('../models/author');
var BookInstance=require('../models/bookinstance');
var Genre=require('../models/genre');

var async =require('async');


exports.index=function(req,res){
   async.parallel({
       book_count:function(callback){
           Book.count(callback);
       },
       genre_count:function(callback){
           Genre.count(callback);
       },
       book_instance_count:function(callback){
           BookInstance.count(callback);
       },
       book_instance_available_count:function(callback){
           BookInstance.count({status:'Available'},callback);
       },
       author_count:function(callback){
           Author.count(callback);
       },
   },
   function(err,results){
    res.render('index',{title:'Local Library Home',error:err,data:results});
   });
};

//Display the list of all books
exports.book_list=function(req,res,next){
    Book.find({},'title author')
    .populate('author')
    .exec(function(err,list_books){
        if(err){return next(err);}
        //successfull so render
        res.render('book_list',{title:'Book list',book_list:list_books});
    });
};

//Display the details of a specific book
exports.book_detail=function(req,res){
    res.send('NOT IMPLEMENTED: Book Details',req.params.id);
};

//Display the book create form on get
exports.book_create_get=function(req,res){
    res.send('NOT IMPLEMENTED: book create get');
};

//Handle the book create form on post
exports.book_create_post=function(req,res){
    res.send('NOT IMPLEMENTED: book create post');
}

//Display the book delet form on get
exports.book_delete_get=function(req,res){
    res.send('NOT IMPLEMENTED: book delete get');
};

//Handle the book delete form on post
exports.book_delete_post=function(req,res){
    res.send('NOT IMPLEMENTED: book delete post');
};

//Display the book update form on get
exports.book_update_get=function(req,res){
    res.send('NOT IMPLEMENTED: book_update get');
}

//Handle the book update on post
exports.book_update_post=function(req,res){
    res.send('NOT IMPLEMENTED: book upadta post');
};
