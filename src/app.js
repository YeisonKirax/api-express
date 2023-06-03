import express from 'express'

const app = express()

app.use( express.json() )

app.use( '/', function ( req, res ) {
  return res.status( 200 ).json( { msg: "Bienvenido" } )
} )

app.listen( 3000, () => {
  console.log( "Aplicación iniciada en puerto 3000" )
} )