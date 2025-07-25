import { Router } from "express";
import { addproduct, getProductById, productDeleteById, productUpdateById } from "../controllers/product.controller.js";

const productRouter =Router();

productRouter.post('/',addproduct);

productRouter.get('/:id', getProductById);

productRouter.put('/:id',productUpdateById);

productRouter.delete('/:id', productDeleteById);

export default productRouter;