import product from "../models/product.model.js";


export const addproduct= async (req,res,next) => {

    try {
        const newproduct =await product.create({...req.body });
        res.status(201).json({
            success: true,
            message: 'product add successfuly',
            data: newproduct

        })
    } catch (error) {
        next(error);
        
    }
};
export const getProductById =async (req,res,next) => {
    
    try {
        const productId = req.params.id;
        const foundproduct= await product.findById(productId);

        if(!product){
            return res.status(404).json({
                success:false,
                message: "Product not found"

            })
            
        };

        res.status(200).json({
            success:true,
            data:foundproduct
        })

    } catch (error) {
        next(error)

    }
 }

 export const productUpdateById = async (req,res,next) => {
    
    try {
        const productId = req.params.id;
        const updates =req.body;

        const updateProduct = await product.findById(
            productId,
            updates,
            { new: true, runValidators: true }
        )

        if(!updateProduct){
            return res.status(404).json ({
                success:true,
                message:'product not found'
            })
        }

        res.status(202).json({
            success:true,
            data:updateProduct
        })


    } catch (error) {
        next(error)
    }
 }

export const productDeleteById = async (req,res,next) => {
    
    try{
        const productId = req.params.id;
        const deleteProduct = await product.findByIdAndDelete(productId);

        if(!deleteProduct){
            return res.status(404).json({
                success:false,
                message:'product not found'
            })
        }

        res.status(202).json({
            success:true,
            message:'product deleted succesfuly',
            data:deleteProduct,
        })
        console.log(deleteProduct)
    }catch(error){
        next(error)
    }
}