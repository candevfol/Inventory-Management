import {Schema,model} from 'mongoose'

const Product = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    threshold: {
        type: Number,
    }
});

const ProductModel = model('Product', Product)
export default ProductModel
