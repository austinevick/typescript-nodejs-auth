import express from 'express';
import { registerUser } from './user.controller';
const userRoute = express.Router();

userRoute.post('/', registerUser)



export default userRoute;