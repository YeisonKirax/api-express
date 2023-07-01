import { awaitCatcher } from 'await-catcher'
import jwt from 'jsonwebtoken'
import environment from '../../../config/environment.js'
import { getUserByEmail } from '../../users/controllers/users.controller.js'
import { UserModel } from '../../users/models/user.model.js'
const { TOKEN_SECRET } = environment

export const login = async ( req, res ) => {
  const { email, password } = req.body
  if ( !email || !password ) {
    return res.status( 400 ).json( { status: "error", msg: "el usuario o contraseña no pueden ser vacíos" } )
  }
  // Buscar el usuario en la DB y se verifica si la contraseña es válida
  const [ userFound, error ] = await awaitCatcher( getUserByEmail( email ) )
  if ( error ) {
    return res.status( 404 ).json( { status: "error", msg: "usuario no encontrado" } )
  }
  if ( !userFound.validPassword( password ) ) {
    return res.status( 400 ).json( { status: "error", msg: "las credenciales entregadas no son válidas" } )

  }
  const payload = {
    id: userFound._id,
    name: userFound.name,
    surname: userFound.surname,
    role: userFound.isAdmin ? 'ADMIN' : 'GUEST'
  }
  const token = jwt.sign( payload, TOKEN_SECRET, {
    expiresIn: "1h",
    algorithm: "HS512"
  } )
  return res.status( 200 ).json( { token } )

}

export const signup = async ( req, res ) => {
  const body = req.body
  const [ userFound, ] = await awaitCatcher( getUserByEmail( body.email ) )
  if ( userFound ) {
    return res.status( 400 ).json( { status: "error", msg: "ya existe un usuario con ese correo" } )
  }
  const user = new UserModel( body )
  user.hashPassword( body.password )
  const [ userSaved, error ] = await awaitCatcher( user.save() )
  if ( !userSaved || error ) {
    console.error( error )
    return res.status( 400 ).json( { status: "error", msg: "no se pudo registrar al usuario" } )
  }
  const payload = {
    id: user._id,
    name: user.name,
    surname: user.surname,
    role: user.isAdmin ? 'ADMIN' : 'GUEST'
  }
  const token = jwt.sign( payload, TOKEN_SECRET, {
    expiresIn: "1h",
    algorithm: "HS512"
  } )
  return res.status( 201 ).json( { token } )
}