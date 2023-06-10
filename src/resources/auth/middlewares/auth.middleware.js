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
    const payload = jwt.verify( token )
    req.user = payload
    next()
  } catch ( error ) {
    if ( error instanceof jwt.TokenExpiredError ) {
      return res.status( 401 ).json( { status: "error", msg: "token expiró" } )
    } else if ( error instanceof jwt.JsonWebTokenError ) {
      return res.status( 401 ).json( { status: "error", msg: "token inválido" } )
    } else {
      return res.status( 401 ).json( { status: "error", msg: error.message } )
    }
  }
}