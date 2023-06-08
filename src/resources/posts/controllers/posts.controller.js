import { awaitCatcher } from 'await-catcher'
import { PostModel } from '../models/post.model.js'
export async function createPost( req, res ) {
  const body = req.body
  const [ postCreated, error ] = await awaitCatcher( PostModel.create( body ) )
  if ( error ) {
    return res.status( 400 ).json( { status: "error", msg: error.message } )
  }
  return res.status( 201 ).json( postCreated )

}

export async function getPosts( req, res ) {
  const [ posts, error ] = await awaitCatcher( PostModel.find().populate( "author", "name surname age" ).exec() )
  if ( error ) {
    return res.status( 400 ).json( { status: "error", msg: error.message } )
  }
  return res.status( 200 ).json( posts )
}

export async function getPostById( req, res ) {
  const id = req.params.id
  const [ post, error ] = await awaitCatcher( PostModel.findById( id ).populate( "author", "-name -surname -age -fullName -_id" ).exec() )
  if ( !post || error ) {
    return res.status( 404 ).json( { status: "error", msg: "usuario no encontrado" } )
  }
  console.log( post )
  return res.status( 200 ).json( post )
}

export async function updatePostById( req, res ) {
  const id = req.params.id
  const body = req.body
  const [ postUpdated, error ] = await awaitCatcher( PostModel.findByIdAndUpdate( id, body, { new: true } ) )
  if ( error ) {
    return res.status( 404 ).json( { status: "error", msg: "usuario no encontrado" } )
  }
  return res.status( 200 ).json( postUpdated )
}

export async function deletePostById( req, res ) {
  const id = req.params.id
  const [ postDeleted, error ] = await awaitCatcher( PostModel.findByIdAndDelete( id ) )
  if ( error ) {
    return res.status( 404 ).json( { status: "error", msg: "usuario no encontrado" } )
  }
  return res.status( 200 ).json( postDeleted )
}