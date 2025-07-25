
import mongoose from "mongoose";

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'subscription name is required'],
        trim:true,
        minLength:2,
        maxLength:100
    },
    price:{
        type: Number,
        required: [true, 'subscription number is required'],
        trim: true,
        minLength: [0, 'price must be greater than 0'],
        maxLength: [1000, 'price must be less than 1000']
    },
    currency:{
        type: String,
        required: [true, 'currency is required'],
        enum: ['INR', 'USD', 'EUR'], 
        default: 'INR'
    },
    category:{
        type: String,
        enum: ['Dress','Fancy','Footwear'],
        required: true,
    }
})

const product =  mongoose.model('product',productSchema);
export default product;