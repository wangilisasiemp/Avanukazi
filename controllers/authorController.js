var Author=require('../models/author');
var Book = require('../models/book');
var async= require('async');
var {body,validationResult}=require('express-validator/check');
var {sanitizeBody} = require('express-validator/filter');

//display a list of all authors
exports.authorList=function(req,res,next){
    Author.find()
    .exec(function(err,list_authors){
        if(err){ return next(err)}
        // successful so its safe to render
        res.render('author_list',{title:'List of Authors',author_list:list_authors});
    });
};

//Display details page for a specific author
exports.authorDetail=function(req,res,next){
    async.parallel({
        author:function(callback){
            Author.findById(req.params.id)
            .exec(callback);
        },
        author_books:function(callback){
            Book.find({'author':req.params.id},'title summary')
            .exec(callback);
        }
    },function(err,results){
        if(err){return next(err);}
        if(results.author==null){//no author
            var err=new Error('Author not found');
            err.status=404;
            return next(err);
        }

        //the query was successfull so render
        res.render('author_detail',{title:'Author Detail',author:results.author,author_books:results.author_books});
    })
}

//Display author create form on GET
exports.author_create_get=function(req,res){
    res.render('author_form',{title:'Create Author'});
}

//Handle author create on POST
exports.author_create_post= [
    //validate fields
    body('first_name').isLength({min:1}).trim().withMessage('First name must be specified!')
    .isAlphanumeric().withMessage('First name has alphanumeric characters'),
    body('family_name').isLength({min:1}).trim().withMessage('Family must be specified!')
    .isAlphanumeric().withMessage('Family has alphanumeric characters'),
    body('date_of_birth','Invalid date of birth').optional({checkFalsy:true}).isISO8601(),
    body('date_of_death','Invalid date of death').optional({checkFalsy:true}).isISO8601(),
    
    //sanitize the fields
    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('family_name').trim().escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),

    //Process request after validation and sanitation
    (req,res,next)=>{
        //Extract the validation errors from the request
        const errors=validationResult(req);

        if(!errors.isEmpty()){
            // There are errors Render the form again
            res.render('author_form',{title:'Create Author', author:req.body, errors:errors.array()});
            return;
        }
        else{
            //Data from the form is valid
            //create the author object with escaped and trimmed data
            var author=new Author({
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death
            });

            author.save(function(err){
                if(err){return next(err);}
                //Successfull
                res.redirect(author.url);
            });
        }
    }
    
];

// Display Author delete form on GET.
exports.author_delete_get = function(req, res, next) {

    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id).exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.params.id }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.author==null) { // No results.
            res.redirect('/catalog/authors');
        }
        // Successful, so render.
        res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books } );
    });

};

// Handle Author delete on POST.
exports.author_delete_post = function(req, res, next) {

    async.parallel({
        author: function(callback) {
          Author.findById(req.body.authorid).exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.body.authorid }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        if (results.authors_books.length > 0) {
            // Author has books. Render in same way as for GET route.
            res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books } );
            return;
        }
        else {
            // Author has no books. Delete object and redirect to the list of authors.
            Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
                if (err) { return next(err); }
                // Success - go to author list
                res.redirect('/catalog/authors')
            })
        }
    });
};
//Display author update form on Get
exports.author_update_get=function(req,res,next){
    res.send('NOT IMPLEMENTED: Author update GET');
};

//Handle author update form on Post
exports.author_update_post=function(req,res){
    res.send('NOT IMPLEMENTED:Author update POST');
}

