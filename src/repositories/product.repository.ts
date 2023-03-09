import ProductModel from '../models/Product'

import type { IProduct } from '../interfaces/Product.interface'

export const getProductData = async () => {
  const result = await ProductModel.find()
  return result
}

export const getProductDataByID = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id })
  return result
}

export const storeProductData = async (payload: IProduct) => {
  const result = await ProductModel.create(payload)
  return result
}

export const updateProductData = async (id: string, payload: IProduct) => {
  const result = await ProductModel.findOneAndUpdate(
    { _id: id },
    { $set: payload }
  )

  return result
}

export const deleteProductData = async (id: string) => {
  const result = await ProductModel.findOneAndDelete({ _id: id })
  return result
}
