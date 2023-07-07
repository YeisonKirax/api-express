import mongoose from 'mongoose'

const postSchema = new mongoose.Schema( {
  title: {
    type: String,
    required: true,
    maxLength: 100
  },
  description: {
    type: String,
    maxLength: 200,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
    required: true
  }
}, { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } } )

export const ProductModel = new mongoose.model( 'Product', postSchema )