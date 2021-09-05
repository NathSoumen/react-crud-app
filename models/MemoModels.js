const mongoose = require('mongoose')
const Schema = mongoose.Schema
const memoSchema = new Schema({
    authorId:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },   
    
    Description:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    Date:{
        type:Date, default:Date.now
    },
    comments:[]
},{
    timestamps:true
})

const Memo = mongoose.model("Memo", memoSchema);
module.exports = Memo