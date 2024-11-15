import {z} from 'zod';

export const usernamevalidation = z
    .string()
    .min(3, {message : "Username must be atleast 3 characters long"})
    .max(20, {message : "Username must be at most 20 characters long"})
    .regex(/^[a-zA-Z0-9]+$/, {message : "Username must not contain special characters"})

export const signupschema = z.object({
    username : usernamevalidation,
    email : z.string().email({message : "Invalid email address"}),
    password : z.string().min(8, {message:"Password must be atleast 8 characters long"}).max(64, {message : "Password must not exceed 100 characters"})
})