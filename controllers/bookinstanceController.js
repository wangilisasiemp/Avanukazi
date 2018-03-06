var BookInstance=require('../models/bookinstance');
var Book = require('../models/book');
var async=require('async');
var {body,validationResult} = require('express-validator/check');
var {sanitizeBody} = require('express-validator/filter');

//Display a list of all book instances
exports.bookinstance_List=function(req,res,next){
    BookInstance.find()
    .populate('book')
    .exec(function(err,list_bookinstances){
        if(err){return next(err)}
        //successfull so render
        res.render('bookinstance_list',{title:'Book Instance List',bookinstance_list:list_bookinstances,user:req.user});
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
                res.render('bookinstance_detail',{title:'Book Instance Detail',bookInstance:book_instance,user:req.user})
            });
};

//Display bookintance create form  GET
exports.bookinstance_create_get=function(req,res,next){
    Book.find({},'title')
    .exec(function(err,books){
        if(err){ next(err);}
        // the query was successful
        res.render('bookinstance_form',{title: 'Create Bookinstance',book_list:books,user:req.user});
    });
};

//Handle bookintance create form POST
exports.bookinstance_create_post=[
    //Validate bookinstance fields
    body('book','Book must be specified').isLength({min:1}).trim(),
    body('imprint','Imprint must be specified').isLength({min:1}).trim(),
    body('due_back','Invalid date').optional({checkFalsy:true}).isISO8601(),

    //sanitize fields
    sanitizeBody('book').trim().escape(),
    sanitizeBody('imprint').trim().escape(),
    sanitizeBody('status').trim().escape(),
    sanitizeBody('due_back').trim().escape(),

    //Process request after validation and sanitization
    (req,res,next)=>{
        //extract the errors from the request
        const errors=validationResult(req);
        //create a new bookinstance
        var bookinstance=new BookInstance({
            book:req.body.book,
            imprint:req.body.imprint,
            status:req.body.status,
            due_back:req.body.due_back
        });

        if(!errors.isEmpty()){
            //there are validation errors ,return the form with the sanitzed values
            Book.find({},'title')
            .exec(function(err,books){
                if(err){return next(err);}

                //the query was successful
                res.render('bookinstance_form',{title:'Create BookInstance',book_list:books,selected_book:bookinstance.book._id,errors:errors.array(),bookinstance:bookinstance,user:req.user});
            })
            return;
        }
        else{
            //There were no validation errors
            bookinstance.save(function(err){
                if(err){return next(err);}

                //the query was successfull
                res.redirect(bookinstance.url);
            })
        }
    }
]

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

