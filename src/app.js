import express from 'express'
import environment from './config/environment.js'
import usersRouter from './resources/users/routes/users.routes.js'

const app = express()

app.use( express.json() )

app.use( '/', function ( req, res ) {
  return res.status( 200 ).json( { msg: "Bienvenido" } )
} )

app.use( usersRouter )

const { PORT } = environment
app.listen( PORT, () => {
  console.log( `Aplicación iniciada en puerto ${ PORT }` )
} )