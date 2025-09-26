import mongoose from "mongoose";
import ProductModel from "../model/Product.model.js"

const createProductModel = async (name, description, quantity, threshold) => {
    const productData = { name, description, quantity };

    if (threshold !== undefined && threshold !== null && threshold !== '') {
        productData.threshold = threshold;
    }

    const productCreated = await ProductModel.create(productData);
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

const updateProductById = async(id, updatedQuantity) => {

    return await ProductModel.findByIdAndUpdate(id, {quantity:updatedQuantity}, {new: true});

}

const getAllProductsBelowThreshold = async() => {

    const products = await ProductModel.find({
        $expr: { $lt: ["$quantity", "$threshold"] }
      });
      return products;
}

export {createProductModel, getProductFromId, deletProductById, updateProductById, getAllProductsBelowThreshold}