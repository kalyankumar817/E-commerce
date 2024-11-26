const Product=require('../models/productSchema')

//post products
const createProduct=async(req,res)=>{
    try{
        const{title,imageUrl,desc,price,rating,category,tags}=req.body
        const product=await Product.create({title,imageUrl,desc,price,rating,category,tags})
        await product.save()
        res.status(200).json(product)
    }catch(err){
        res.status(500).json({message:'Error creating products',err})
    }
}
//getall
const getAll=async(req,res)=>{
    try{
        const product=await Product.find()
        res.status(200).json(product)
    }catch(err){
        res.status(500).json({message:"Error getting all data",err})
    }
}

//getall by id
const getById=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id)
        if(!product){
            res.status(404).json({message:"Product data not found for id"})
        }
        res.status(200).json(product)
    }catch(err){
        res.status(500).json({message:"Error getting data by id",err})
    }
}

//update product
const updateProduct=async(req,res)=>{
    try{
        const{title,imageUrl,desc,price,rating,category,tags}=req.body
        const update_product=await Product.findByIdAndUpdate(req.params.id,{title,imageUrl,desc,price,rating,category,tags},{new:true})
        if(!update_product){
            res.status(404).json({message:"product data not found for update"})
        }
        res.status(200).json(update_product)
    }catch(err){
        res.status(500).json({message:"Error getting data to be updated",err})
    }
}

//delete product
const deleteProduct=async(req,res)=>{
    try{
        const delete_product=await Product.findByIdAndDelete(req.params.id)
        if(!delete_product){
            res.status(404).json({message:"product data not found for to delete"})
        }
        res.status(200).json(delete_product)
    }catch(err){
        res.status(500).json({message:"Error getting data to be deleted",err})
    }
}
module.exports={createProduct,getAll,getById,updateProduct,deleteProduct}
