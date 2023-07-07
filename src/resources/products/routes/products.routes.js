import { Router } from 'express'
import { getProductById, getProducts } from '../controllers/products.controller.js'

const productsRouter = Router()
const baseURI = '/products'

productsRouter.get( baseURI, getProducts )
productsRouter.get( `${ baseURI }/:id`, getProductById )

export default productsRouter