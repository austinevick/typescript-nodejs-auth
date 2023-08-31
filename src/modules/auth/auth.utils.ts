import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export function signJwt(payload: string | Buffer | object) {
    return jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '1d' })
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
        return decoded;
    } catch (error) {
        console.log(error)
    }
}