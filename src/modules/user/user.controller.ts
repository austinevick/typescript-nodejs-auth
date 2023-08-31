import { Request, Response } from 'express';
import { createUser } from './user.service';
import { RegisterUserBody } from './user.schema';

export async function registerUser(req: Request<{}, {}, RegisterUserBody>, res: Response) {
    const { username, email, password } = req.body
    try {
        const data = await createUser({ username, email, password });
        return res.status(201).json({
            status: 201,
            message: 'User created',
            data: data
        })
    } catch (error: any) {
        return res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}