import express from 'express';
import { registerUser } from './user.controller';
import { requireUser } from '../../middleware/requireUser';
const userRoute = express.Router();

userRoute.get('/', requireUser, (req, res) => {
    return res.send(res.locals.user);
})

userRoute.post('/', registerUser)



export default userRoute;