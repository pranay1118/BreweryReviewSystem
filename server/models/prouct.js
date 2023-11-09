const mongoose=require('mongoose');
const schema= new mongoose.Schema({
    rating:Number,
    reviews:{userId:String,review:String},
    productId:String,
},{timestamps:true});

const Product=mongoose.model('Product',schema);
module.exports=Product;