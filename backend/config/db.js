import mongoose from 'mongoose'

export const connectDB = async() => {
  try{
    await mongoose.connect("mongodb+srv://aswin:Aswin1212@cluster0.c4hjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

    console.log("Database connected successfully.");
    
  }
  catch(err){
    console.log(err);
  }
}
