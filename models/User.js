const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        min:6,
        required:true,
    }
},{
    timestamps:true
})


userSchema.methods.hashPass = function(pass) {
   return bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePass = (pass, hash) => {
    let a = bcrypt.compareSync(pass,hash)
    return a
}
const User = mongoose.model("User" , userSchema);
module.exports = User