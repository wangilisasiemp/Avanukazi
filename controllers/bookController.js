var Book=require('../models/book');


exports.index=function(req,res){
    res.send('NOT IMPLEMENTED: Site Home Page');
};

//Display the list of all books
exports.book_list=function(req,res){
    res.send('NOT IMPLEMENTED: Book list');
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
