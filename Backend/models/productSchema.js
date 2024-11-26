const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:true
    }
},{timestamps:true});
module.exports=mongoose.model('Product',productSchema)