import { Router } from 'express'
import { createPost, deletePostById, getPostById, getPosts, updatePostById } from '../controllers/posts.controller.js'

const postsRouter = Router()
const baseURI = '/posts'

postsRouter.post( baseURI, createPost )
postsRouter.get( baseURI, getPosts )
postsRouter.get( `${ baseURI }/:id`, getPostById )
postsRouter.patch( `${ baseURI }/:id`, updatePostById )
postsRouter.delete( `${ baseURI }/:id`, deletePostById )

export default postsRouter