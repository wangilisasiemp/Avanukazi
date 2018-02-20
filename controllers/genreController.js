var Genre=require('../models/genre');
var Book=require('../models/book');
var async=require('async');

//display a list of all genres
exports.genres_list=function(req,res,next){
    Genre.find()
    .sort({name:'asc'})
    .exec(function(err,list_genres){
        if(err){return next(err)}
        //successful query display the data
        res.render('genre_list',{title:'Genre List',genre_list:list_genres});
    });
};

//Display the details of a specific genres list
exports.genre_detail=function(req,res,next){
   async.parallel({
       genre:function(callback){
           Genre.findById(req.params.id)
           .exec(callback);
       },
       genre_books:function(callback){
           Book.find({'genre':req.params.id})
           .exec(callback);
       },
   },function(err,results){
       if(err){return next(err);}
       if(results.genre==null){ //no results
            var err=new Error('Genre not Found');
            err.status=404;
            return next(err);
       }
       //successfull so render
       res.render('genre_detail',{title:'Genre Detail',genre:results.genre,genre_books:results.genre_books});
   });
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