import { Router } from 'express';
import { login, signup } from '../controllers/auth.controller.js';

const authRoutes = Router()
const baseURI = "/auth"

authRoutes.post( `${ baseURI }/login`, login )
authRoutes.post( `${ baseURI }/signup`, signup )


export default authRoutes