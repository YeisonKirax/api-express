import jwt from 'jsonwebtoken'
import environment from '../../../config/environment.js'
const { TOKEN_SECRET } = environment
export const verifyToken = ( req, res, next ) => {
  const authHeader = req.headers[ "authorization" ]
  if ( !authHeader ) {
    return res.status( 401 ).json( { status: "error", msg: "header no presente" } )
  }
  const token = authHeader.split( " " )[ 1 ]
  if ( !token ) return res.status( 401 ).json( { status: "error", msg: "token no presente" } )
  try {
    const payload = jwt.verify( token, TOKEN_SECRET )
    req.user = payload
    next()
  } catch ( error ) {
    console.error( error );;
    if ( error instanceof jwt.TokenExpiredError ) {
      return res.status( 401 ).json( { status: "error", msg: "token expiró" } )
    } else if ( error instanceof jwt.JsonWebTokenError ) {
      return res.status( 401 ).json( { status: "error", msg: "token inválido" } )
    } else {
      return res.status( 401 ).json( { status: "error", msg: error.message } )
    }
  }
}

export const isAdmin = ( req, res, next ) => {
  const user = req.user
  if ( user.role !== 'ADMIN' ) {
    return res.status( 403 ).json( { "status": "error", msg: "el usuario no tiene los permisos necesarios" } )
  }
  next()
}