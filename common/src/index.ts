import z from  "zod"

export const signUpInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})



export const signIpInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})



export const createPost = z.object({
    title: z.string(),
    content: z.string().min(6)
})



export const updatePost = z.object({
    title: z.string(),
    content: z.string().min(6),
    published: z.boolean()
})



export type SignUpInput = z.infer<typeof signUpInput>
export type SignIpInput = z.infer<typeof signIpInput>
export type CreatePost = z.infer<typeof createPost>
export type UpdatePost = z.infer<typeof updatePost>