import { Router } from 'express'
import { isAdmin, verifyToken } from '../../auth/middlewares/auth.middleware.js'
import { createUser, deleteUserById, getUserById, getUsers, updateUserById } from '../controllers/users.controller.js'

const usersRouter = Router()
const baseURI = '/users'

usersRouter.post( baseURI, createUser )
usersRouter.get( baseURI, verifyToken, isAdmin, getUsers )
usersRouter.get( `${ baseURI }/profile`, verifyToken, getUserById )
usersRouter.patch( `${ baseURI }/:id`, updateUserById )
usersRouter.delete( `${ baseURI }/:id`, deleteUserById )

export default usersRouter