import express from 'express'
import { createProduct, deletProduct, getBelowThreshold, getProduct, updateProduct } from '../controller/Products.Controller.js'
import { createProductValidator, updateProductValidator } from '../utils/request_validators.js'


const appRouter = express.Router()

appRouter.post('/create',createProductValidator, createProduct)
appRouter.get('/belowThreshold', getBelowThreshold);
appRouter.get('/:id', getProduct);
appRouter.delete('/:id', deletProduct);
appRouter.patch('/:id',updateProductValidator, updateProduct);


export default appRouter