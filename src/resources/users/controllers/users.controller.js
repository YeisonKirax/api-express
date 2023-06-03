import { v4 as generateUUID } from 'uuid'
const users = []
export function createUser( req, res ) {
  const body = req.body
  const id = generateUUID()
  const userCreated = {
    ...body,
    id: id
  }
  users.push( userCreated )
  return res.status( 201 ).json( userCreated )
}

export function getUsers( req, res ) {
  return res.status( 200 ).json( users )
}

export function getUserById( req, res ) {
  const id = req.params.id
  const userFound = users.find( user => user.id === id )
  if ( !userFound ) {
    return res.status( 404 ).json( { status: "error", msg: "usuario no encontrado" } )
  }
  return res.status( 200 ).json( userFound )
}

export function updateUserById( req, res ) {
  const id = req.params.id
  const body = req.body
  const userIndex = users.findIndex( user => user.id === id )
  if ( userIndex === -1 ) {
    return res.status( 404 ).json( { status: "error", msg: "usuario no encontrado" } )
  }
  users[ userIndex ] = body
  return res.status( 200 ).json( users[ userIndex ] )
}

export function deleteUserById( req, res ) {
  const id = req.params.id
  const userIndex = users.findIndex( user => user.id === id )
  if ( userIndex === -1 ) {
    return res.status( 404 ).json( { status: "error", msg: "usuario no encontrado" } )
  }
  const userRemoved = users.splice( userIndex, 1 )[ 0 ]
  return res.status( 200 ).json( userRemoved )
}