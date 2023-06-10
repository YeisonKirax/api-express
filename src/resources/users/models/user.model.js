import crypto from 'crypto'
import mongoose from 'mongoose'
import validator from 'validator'
const userSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20
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
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  salt: String

}, { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } } )

userSchema.methods.hashPassword = function ( password ) {
  this.salt = crypto.randomBytes( 16 ).toString( "hex" )
  this.password = crypto.pbkdf2Sync( password, this.salt, 10000, 512, 'sha512' ).toString( 'hex' )
}

userSchema.methods.validPassword = function ( password ) {
  const hash = crypto.pbkdf2Sync( password, this.salt, 10000, 512, 'sha512' ).toString( 'hex' )
  return this.password === hash
}

userSchema.pre( 'save', function ( next ) {
  console.log( "Usuario a agregar" )
  console.log( this.toJSON() );
  next()
} )

userSchema.post( 'save', function ( document ) {
  console.log( "Usuario agregado" )
  console.log( document );
} )

userSchema.virtual( 'fullName' ).get( function () {
  return `${ this.name } ${ this.surname }`
} )

export const UserModel = new mongoose.model( 'User', userSchema )