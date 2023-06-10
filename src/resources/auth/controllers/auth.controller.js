import jwt from 'jsonwebtoken'
import environment from '../../../config/environment.js'

const { TOKEN_SECRET } = environment

export const login = async ( req, res ) => {
  const { email, password } = req.body
  if ( !email || !password ) {
    return res.status( 400 ).json( { status: "error", msg: "el usuario o contraseña no pueden ser vacíos" } )
  }
  // Buscar el usuario en la DB y se verifica si la contraseña es válida
  const payload = {
    id: "647b745ad095eafd18d8e47b",
    name: "Yeison",
    surname: "Fernandez",
  }
  const token = jwt.sign( payload, TOKEN_SECRET, {
    expiresIn: 5,
    algorithm: "HS512"
  } )
  return res.status( 200 ).json( { token } )

}