import {z} from 'zod'

const register = z.object({
    body:z.object({
    email:z.string().email(),
    password:z.string().min(6),
    role:z.enum(['user','admin']).default('user')
    })
})

module.exports = {register};