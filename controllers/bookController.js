var Book=require('../models/book');
var Author=require('../models/author');
var BookInstance=require('../models/bookinstance');
var Genre=require('../models/genre');
var {body,validationResult}= require('express-validator/check');
var {sanitizeBody} = require('express-validator/filter');

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
exports.book_detail=function(req,res,next){
    async.parallel({
        book:function(callback){
            Book.findById(req.params.id)
            .populate('author')
            .populate('genre')
            .exec(callback);
        },
        book_instance:function(callback){
            BookInstance.find({'book':req.params.id})
            .exec(callback);
        },
    },function(err,results){
        if(err){return next(err)};
        if(results.book==null){//No books
            var err=new Error('Book not found!');
            err.status=404;
            return next(err);
        }

        // the query was successful so render
        res.render('book_detail',{title:'Book Detail',book:results.book,book_instance:results.book_instance});
    })
};

//Display the book create form on get
exports.book_create_get=function(req,res,next){
    //Get all authors and genres that we can use to add our book
    async.parallel({
        authors:function(callback){
            Author.find()
            .exec(callback);
        },
        genres:function(callback){
            Genre.find()
            .exec(callback);
        }
    },function(err,results){
        if(err){return next(err);}
        res.render('book_form',{title:'Create Book',authors:results.authors, genres:results.genres});
    });

};

//Handle the book create form on post
exports.book_create_post=[
    //Convert the genre to an array
    (req,res,next)=>{
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre==='undefined'){
                req.body.genre=[];
            }else{
                req.body.genre=new Array(req.body.genre);
            }
        }
        next();
    },
    //Validate the form data
    body('title','Title Must not be empty').isLength({min:1}).trim(),
    body('author','Author Must not be Empty').isLength({min:1}).trim(),
    body('summary','Summary must not be empty').isLength({min:1}).trim(),
    body('isbn','ISBN must not be empty').isLength({min:1}).trim(),
    
    //sanitize fields using wildcard
    sanitizeBody('*').trim().escape(),

    //process request after validation and sanitization
    (req,res,next)=>{
        // Extract the validation error from the request
        const errors=validationResult(req);

        //create a book object with escaped and trimmed chars
        var book=new Book({
            title:req.body.title,
            author:req.body.author,
            summary:req.body.summary,
            isbn:req.body.isbn,
            genre:req.body.genre
        });

        if(!errors.isEmpty()){
            // There are errors Render form again with forms and sanitized values
            //get all authors and genres for the form
            async.parallel({
                authors:function(callback){
                    Author.find(callback);
                },
                genres:function(callback){
                    Genre.find(callback);
                }
            },function(err,results){
                if(err){return next(err);}
                //mark our selected genres as checked
                for(let i=0; i<results.genres.length-1; i++){
                    if(book.genre.indexOf(results.genres[i]._id)>-1){
                        results.genres[i].checked='true';
                    }
                }
                res.render('book_form',{title:"Create Book",authors:results.authors,genres:results.genres,book:book,errors:errors.array()})
            });
            return;
        }
        else{
            // Data from the form is Valid save the book
            book.save(function(err){
                if(err){return next(err);}
                //successful redirect to the new book page
                res.redirect(book.url);
            })
        }
    }
]

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
    //Get book authors and genre for form
    async.parallel({
        book:function(callback){
            Book.findById(req.params.id).populate('author').populate('genre').exec(callback);
        },
        authors:function(callback){
            Author.find(callback);
        },
        genres:function(callback){
            Genre.find(callback);
        }
    },function(err,results){
        if(err){return next(err);}
        if(results.book==null){//No results
            var err=new Error('Not found');
            err.status=404;
            return next(err);
        }
        //success Mark our selected genre as checked
        for(var all_g_iter=0; all_g_iter<results.genres.length; all_g_iter++){
            for(var book_g_iter=0; book_g_iter<results.book.genre.length; book_g_iter++){
                if(results.genres[all_g_iter]._id.toString()==results.book.genre[book_g_iter]._id.toString()){
                    results.genres[all_g_iter].checked='true';
                }
            }
        }
        res.render('book_form',{title:'Update Book',authors:results.authors,genres:results.genres,book:results.book});
    });
}

// Handle book update on POST.
exports.book_update_post = [

    // Convert the genre to an array
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre==='undefined')
            req.body.genre=[];
            else
            req.body.genre=new Array(req.body.genre);
        }
        next();
    },
   
    // Validate fields.
    body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
    body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
    body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
    body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),

    // Sanitize fields.
    sanitizeBody('title').trim().escape(),
    sanitizeBody('author').trim().escape(),
    sanitizeBody('summary').trim().escape(),
    sanitizeBody('isbn').trim().escape(),
    sanitizeBody('genre.*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped/trimmed data and old id.
        var book = new Book(
          { title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: (typeof req.body.genre==='undefined') ? [] : req.body.genre,
            _id:req.params.id //This is required, or a new ID will be assigned!
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                authors: function(callback) {
                    Author.find(callback);
                },
                genres: function(callback) {
                    Genre.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                // Mark our selected genres as checked.
                for (let i = 0; i < results.genres.length; i++) {
                    if (book.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked='true';
                    }
                }
                res.render('book_form', { title: 'Update Book',authors:results.authors, genres:results.genres, book: book, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Book.findByIdAndUpdate(req.params.id, book, {}, function (err,thebook) {
                if (err) { return next(err); }
                   // Successful - redirect to book detail page.
                   res.redirect(thebook.url);
                });
        }
    }
];
