import mongoose from "mongoose";
import ProductModel from "../model/Product.model.js"

const createProductModel = async (name, description, quantity) => {
        const productCreated = await ProductModel.create({name,description,quantity})
        return productCreated;
}

const getProductFromId = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    return await ProductModel.findById(id);
}

const deletProductById = async(id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    return await ProductModel.findByIdAndDelete(id);
}

export {createProductModel, getProductFromId, deletProductById}