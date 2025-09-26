import { body, param } from "express-validator";

const createProductValidator = [
    body('name').isString().withMessage(`Product name in String is expected`),
    body('description').isString().withMessage(`Product description in String is expected`),
    body('quantity').isInt().withMessage(`Product quantity in Number is expected`)
]


export {
    createProductValidator
}

