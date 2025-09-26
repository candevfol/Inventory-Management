import express from 'express'
import { createProduct, deletProduct, getProduct } from '../controller/Products.Controller.js'
import { createProductValidator } from '../utils/request_validators.js'


const appRouter = express.Router()

appRouter.post('/create',createProductValidator, createProduct)
appRouter.get('/:id', getProduct);
appRouter.delete('/:id', deletProduct);

export default appRouter