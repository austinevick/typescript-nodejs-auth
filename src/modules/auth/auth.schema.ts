import { object, string, TypeOf } from 'zod';


export const loginSchema = {
    body: object({
        email: string({
            required_error: "email is required",
        }).email({ message: 'Not a valid email' }),
        password: string({
            required_error: "password is required"
        })
    })
}

export type LoginBody = TypeOf<typeof loginSchema.body>;
