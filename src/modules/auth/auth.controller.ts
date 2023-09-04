import { Request, Response } from 'express';
import { findUserAndOmitPwd, findUserByEmail } from '../user/user.service';
import { signJwt } from './auth.utils';
import omit from '../../helpers/omit';
import { LoginBody } from './auth.schema';


export async function loginUser(req: Request<{}, {}, LoginBody>, res: Response) {
    const { email, password } = req.body

    try {
        const user = await findUserByEmail(email);
        if (!user || !user.comparePassword(password)) {
            return res.status(401).json({
                status: 401,
                message: "Invalid email or password"
            });
        }
        const data = await findUserAndOmitPwd(user.email)
        const payload = omit(user.toJSON(), 'password');
        const jwt = signJwt(payload);

        res.cookie("accessToken", jwt, {
            maxAge: 3.154e10, // 1yr
            httpOnly: true,
            domain: 'localhost',
            path: '/',
            sameSite: 'strict',
            secure: false
        })

        return res.status(200).json({
            status: 200,
            message: 'User created',
            data: data,
            token: jwt
        })
    } catch (error: any) {
        return res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}