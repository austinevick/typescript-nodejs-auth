import express from 'express';
import { loginUser } from './auth.controller';
import { processRequestBody } from 'zod-express-middleware';
import { loginSchema } from './auth.schema';
const authRoute = express.Router();

authRoute.post('/', processRequestBody(loginSchema.body), loginUser)



export default authRoute;