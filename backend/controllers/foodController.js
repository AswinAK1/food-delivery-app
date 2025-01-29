import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food item
const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Image upload failed." });
  }

  let image_filename = req.file.filename;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};


// List all food

const listFood = async(req,res) =>{
  try {
    const foods = await foodModel.find({})
    res.json({success:true,data:foods})
  } catch (error) {
    console.log(error);
    res.json({message:"something went wrong"})
  }
}


// remove food item

const removeFood = async(req,res) =>{
  try {
    // find the food item with id
    const foods = await foodModel.findById(req.body.id)

    // delete the data on the uploads folder with the selected id
    fs.unlink(`uploads/${foods.image}`,()=>{})

    // remove data from the mongodb
    await foodModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"removed item"})

  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
  }
}



export {addFood,listFood,removeFood}