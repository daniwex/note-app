'use server'

import { redirect } from 'next/navigation'
import { createUser } from "../lib/createUser";
import { FormState, SignUpFormSchema } from "../lib/definitions";
import { createSession } from "../lib/session";
let bcrypt = require("bcryptjs")


export async function signUp(state: FormState, formData: FormData) {
    const validateFields = SignUpFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }
    const { email, password } = validateFields.data
    const hashedPassword = await bcrypt.hash(password, 10)
   const data = await createUser(email, hashedPassword)
    if (!data) {
        return {
            message: 'An error occured while creating your account.'
        }
    } 
    await createSession(data._id)
    return data
}