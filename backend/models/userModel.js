import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
  cartData:{
    type:Object,
    default:{}
  }
},
// default minimize is true. the false in used to add the empty data in to the database . eg:cartData is empty at the initial time .
{minimize:false})

const userModel = mongoose.model("user",userSchema)
export default  userModel;