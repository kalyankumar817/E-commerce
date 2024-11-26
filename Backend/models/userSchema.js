const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required'],
        unique:true,
        trim:true, //removes leading/trailling spaces
        minlength:[3,'Username must be atleast 3 characters long']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        trim:true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address',
        ]
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[6,'Password must be atleast 6 characters long']
    },
    refreshToken:{
        type:String
    },
},{timestamps:true});

module.exports=mongoose.model('User',userSchema)