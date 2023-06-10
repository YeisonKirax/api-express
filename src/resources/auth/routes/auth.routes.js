import { Router } from 'express';

const authRoutes = Router()
const baseURI = "/auth"

authRoutes.post( `${ baseURI }/login` )
authRoutes.post( `${ baseURI }/signup` )


export default authRoutes