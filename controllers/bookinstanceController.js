var BookInstance=require('../models/bookinstance');

//Display a list of all book instances
exports.bookinstance_List=function(req,res){
    res.send('NOT IMPLEMENTED: Book instance List');
};

//Display details of a specific book intance
exports.bookinstance_Detail=function(req,res){
    res.send('NOT IMPLEMENTED:Bookinstance Details for :',res.params.id);
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

