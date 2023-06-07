import mongoose, { SchemaTypes } from 'mongoose'

const postSchema = new mongoose.Schema( {
  title: String,
  body: String,
  author: {
    type: SchemaTypes.ObjectId,
    required: true
  }
}, { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } } )

export const PostModel = new mongoose.model( 'Post', postSchema )