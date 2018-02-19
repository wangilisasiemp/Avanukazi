var Author=require('../models/author');

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
exports.authorDetail=function(req,res){
    res.send('NOT IMPLEMENTED AUTHOR DETAIL:'+req.params.id);
}

//Display author create form on GET
exports.author_create_get=function(req,res){
    res.send('NOT IMPLEMENTED AUTHOR CREATE GET');
}

//Handle author create on POST
exports.author_create_post=function(req,res){
    res.send('NOT IMPLEMENTED: Author Create Post');
}

//Display author delete form on GET
exports.author_delete_get=function(req,res){
    res.send('NOT IMPLEMENTED: Author delete Get');
}

//Handle author delete form on POST
exports.author_delete_post=function(req,res){
    res.send('NOT IMPLEMENTED: Author delete POST');
}
//Display author update form on Get
exports.author_update_get=function(req,res){
    res.send('NOT IMPLEMENTED:Author update GET');
}

//Handle author update form on Post
exports.author_update_post=function(req,res){
    res.send('NOT IMPLEMENTED:Author update POST');
}

