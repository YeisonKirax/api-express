import mongoose from 'mongoose'

// const userSchema1 = new mongoose.Schema( {
//   name: String,
//   surname: String,
//   age: Number
// } )

const userSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  }
}, { versionKey: false } )

export const UserModel = new mongoose.model( 'User', userSchema )