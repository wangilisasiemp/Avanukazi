var mongoose = require('mongoose');
var moment=require('moment');

var Schema=mongoose.Schema;

var AuthorSchema=new Schema(
    {
        first_name:{type:String,required:true,max:100},
        family_name:{type:String,required:true,max:100},
        date_of_birth:{type:Date},
        date_of_death:{type:Date},
    }
);

//virtual for the authors fullname
AuthorSchema
.virtual('name')
.get(function(){
    return this.family_name+', '+this.first_name;
});

//virtual for the author's url
AuthorSchema
.virtual('url')
.get(function(){
    return '/catalog/author/'+this._id;
});

AuthorSchema
.virtual('formatted_DOB')
.get(function(){
    return this.date_of_birth ? moment(this.date_of_birth).format('YYYY'): '';
});

AuthorSchema
.virtual('formatted_DOD')
.get(function(){
    return this.date_of_death ? moment(this.date_of_death).format('YYYY'):'';
});

module.exports=mongoose.model('Author',AuthorSchema);
