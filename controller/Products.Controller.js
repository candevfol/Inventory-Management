import { validationResult } from "express-validator"
import { createProductModel, deletProductById, getProductFromId } from "../repository/Product.Repository.js"

const createProduct = async (req, res, next) => {
    try{
        const valResult = validationResult(req)
        if(valResult.errors.length) {
            return res.status(400).json({
                message: valResult.errors[0].msg
            })
        }
        const {name, description, quantity} = req.body

        const createdProduct = await createProductModel(name, description, quantity);
        if(!createdProduct){
            return res.status(400).json({
                message: "Something went wrong while creating creating product.Please try again"
            })
        }
        return res.status(201).json({
            message: "Product created successfully",
            data: createdProduct
        })
    }
    catch(err){
        next(err);
    }
}

const getProduct = async (req,res,next) => {
    try{
        const id = req.params.id;
        const productFound = await getProductFromId(id);
        if(!productFound){
            return res.status(404).json({messgae: "Product not found"})
        }
        return res.status(200).json({
            message: "Product found successfully",
            data: productFound
        })
    }
    catch(err) {
        next(err);
    }
    
}

const deletProduct = async(req, res, next) => {
    try{
        const id = req.params.id;
        const productDeleted = await deletProductById(id, next);
        if(!productDeleted){
            return res.status(404).send({messgae: "Product not found to delet.Please give correct ID"})
        }
        return res.status(200).send({
            message: "Product deleted successfully",
            data: productDeleted
        })
    }
    catch(err) {
        next(err);
    }
}

export {createProduct, getProduct, deletProduct}