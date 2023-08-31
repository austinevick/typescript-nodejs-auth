import express from 'express';
import { registerUser } from './user.controller';
const UserRouter = express.Router();

UserRouter.post('/', registerUser)



export default UserRouter;