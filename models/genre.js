var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var GenreSchema=new Schema(
    {
        name:{type:String,required:true,min:3,max:100},
    }
);

//virtual function for the genre url
GenreSchema
.virtual('url')
.get(function(){
    return '/catalog/genre/'+this._id;
});

//exporting the model
module.exports=mongoose.model('Genre',GenreSchema);