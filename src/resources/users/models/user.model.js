import mongoose from 'mongoose'
import validator from 'validator'
// const userSchema1 = new mongoose.Schema( {
//   name: String,
//   surname: String,
//   age: Number
// } )

const userSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 3
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    validate: function ( email ) {
      return validator.isEmail( email )
    }
  },
  age: {
    type: Number,
    required: false,
    default: 0
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  pets: [
    {
      type: String
    }
  ],
  addresses: [ {
    calle: {
      type: String,
      required: true
    },
    region: {
      type: String,
      required: true
    },
    numero: {
      type: String,
      required: true
    }
  } ]
}, { versionKey: false } )

userSchema.pre( 'save', function ( next ) {
  console.log( "Usuario a agregar" )
  console.log( this.toJSON() );
  next()
} )

userSchema.post( 'save', function ( document ) {
  console.log( "Usuario agregado" )
  console.log( document );
} )

export const UserModel = new mongoose.model( 'User', userSchema )