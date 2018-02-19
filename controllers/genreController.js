var Genre=require('../models/genre');

//display a list of all genres
exports.genres_list=function(req,res){
    res.send('NOT IMPLEMENTED: Genres list');
}

//Display the details of a specific genres list
exports.genre_detail=function(req,res){
    res.send('NOT IMPLEMENTED: Genre Detail',req.params.id);
}

//Display the genre create form on GET
exports.genre_create_get=function(req,res){
    res.send('NOT IMPLEMENTED: Genre create get');
};

//Handle the genre create form on POST
exports.genre_create_post=function(req,res){
    res.send('NOT IMPLEMNTED: Genre create post');
};

//Display the genre delete form on get
exports.genre_delete_get=function(req,res){
    res.send('NOT IMPLEMENTED: Genre delete get');
}

//Handle the genre delete form post
exports.genre_delete_post=function(req,res){
    res.send('NOT IMPLEMENTED: Genre delete post');
}

//Display the genre update get
exports.genre_update_get=function(req,res){
    res.send('NOT IMPLEMENTED: genre update get');
}

//Display the genre update post
exports.genre_update_post=function(req,res){
    res.send('NOT IMPLEMENTED: genre update post')
}