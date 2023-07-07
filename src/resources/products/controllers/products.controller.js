import { awaitCatcher } from 'await-catcher'
import { ProductModel } from '../models/product.model.js'

export async function getProducts( req, res ) {
  const [ products, error ] = await awaitCatcher( ProductModel.find() )
  if ( error ) {
    return res.status( 400 ).json( { status: "error", msg: error.message } )
  }
  return res.status( 200 ).json( products )
}

export async function getProductById( req, res ) {
  const id = req.params.id
  const [ product, error ] = await awaitCatcher( ProductModel.findById( id ) )
  if ( !product || error ) {
    return res.status( 404 ).json( { status: "error", msg: "producto no encontrado" } )
  }
  console.log( product )
  return res.status( 200 ).json( product )
}
