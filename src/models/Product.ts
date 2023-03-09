import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: String,
  price: Number
})

const ProductModel = mongoose.model('product', productSchema)

export default ProductModel
