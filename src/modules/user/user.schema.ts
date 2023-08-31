import { object, string, TypeOf } from 'zod';


export const registerUserSchema = {
    body: object({
        username: string({
            required_error: 'username is required'
        }),

        email: string({
            required_error: 'email is required'
        }).email('Must be a valid email'),

        password: string({
            required_error: 'password is required'
        }).min(6),
        confirmPassword: string({
            required_error: 'password does not match'
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    })
}

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;