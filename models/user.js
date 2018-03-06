var mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs');

var Schema=mongoose.Schema;

var UserSchema=new Schema({
    email:String,
    password:String,
});

//generate the hash for the password
UserSchema.methods.generateHash=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

//theck if the password is valid
UserSchema.methods.validPassword=function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports=mongoose.model('user',UserSchema);

