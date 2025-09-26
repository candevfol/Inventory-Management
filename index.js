import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import {connectDB} from './utils/connection.js'
import ProductRoute from './routes/Products.routes.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000
connectDB();

app.use('/api/products', ProductRoute)


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
});
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})