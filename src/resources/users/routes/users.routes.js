import { Router } from 'express'

const usersRouter = Router()
const baseURI = '/users'

usersRouter.post( baseURI )
usersRouter.get( baseURI )
usersRouter.get( `${ baseURI }/:id` )
usersRouter.put( `${ baseURI }/:id` )
usersRouter.delete( `${ baseURI }/:id` )

export default usersRouter