const Product=require("../models/prouct")
exports.addReview=async(req,res)=>{
    try{
        const data =req.body;
        console.log(req.body,"df")
        const newReview=new Product(data);
        console.log(newReview,"eea")
        const savedReview=await newReview.save();
        return res.status(201).json({
            status:0,
            data:savedReview,
            message:"successfully added!!"
        }) 
    }
    catch(err){
        return res.status(400).json({
            status:1,
            message:"something went wrong!!"
        }) 
    }
}
exports.getReview=async(req,res)=>{
    const {productId}=req.params;
    console.log(productId,"dfgfgf");
    try{
       const existData=await Product.findOne({productId});
       if(existData){
        return res.status(201).json({
            status:0,
            data:existData,
            message:"Records founds"
        }) 
       }
       return res.status(200).json({
        status:1,
        message:"Records not found!!"
    }) 
    }
    catch(err){
        return res.status(400).json({
            status:1,
            message:"something went wrong!!"
        }) 
    }
}