import { Router } from 'express'
import { createUser, deleteUserById, getUserById, getUsers, updateUserById } from '../controllers/posts.controller.js'

const postsRouter = Router()
const baseURI = '/posts'

postsRouter.post( baseURI, createUser )
postsRouter.get( baseURI, getUsers )
postsRouter.get( `${ baseURI }/:id`, getUserById )
postsRouter.patch( `${ baseURI }/:id`, updateUserById )
postsRouter.delete( `${ baseURI }/:id`, deleteUserById )

export default postsRouter