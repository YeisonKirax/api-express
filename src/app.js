import express from 'express'
import environment from './config/environment.js'

const app = express()

app.use( express.json() )

app.use( '/', function ( req, res ) {
  return res.status( 200 ).json( { msg: "Bienvenido" } )
} )
const { PORT } = environment
app.listen( PORT, () => {
  console.log( `Aplicación iniciada en puerto ${ PORT }` )
} )