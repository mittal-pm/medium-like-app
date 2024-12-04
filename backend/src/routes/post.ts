import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'

type Bindings = {
    DATABASE_URL: string
    JWT_SECRET: string
  }
export const postRoutes = new Hono<{Bindings: Bindings, Variables: {userId: string}}>();

postRoutes.use('/*', async(c, next)=>{
    const header = c.req.header("authorization") || ""
     //Bearer Token = ['Bearer', 'Token']
    const token =  header.split(" ")[1]
    try{
        const response  = await verify(token, c.env.JWT_SECRET)
        if(response.id){
            c.set( "userId", String(response.id) )
            await next()
        }else{
            c.status(403)
            return c.json({message: "Token Invalid"})
        }
    }catch(e){
        c.status(403)
        return c.json({message: "You are not logged In"})
    }

})


postRoutes.post('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())
    
    const body = await  c.req.json()
    const userId = c.get("userId")

    try{
        const post = await prisma.post.create({
          data: {
            title: body.title,
            content: body.content,
            authorId: userId
          }
        })
  
        return c.json({ message : 'Post Created Successfully',  id: post.id})
      }catch(e :any){
        c.status(500)
        return c.json({message: e.message})
    }
})
  
postRoutes.put('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())
    const body = await  c.req.json()
    const userId = c.get("userId")
    const postId = c.req.param('id')
    try{
        const post = await prisma.post.update({
            where: {
                authorId: userId,
                id: postId
            },
            data: {
                title: body.title,
                content: body.content,
                published: body.published
            }
        })

        if(!post){
            throw new Error('Post Not Found')
        }
  
        return c.json({ message : 'Post Updated Successfully',  id: post.id})
      }catch(e :any){
        c.status(500)
        return c.json({message: e.message})
    }
})

postRoutes.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())
      const userId = c.get("userId")
      console.log(userId)
    try{
        const posts = await prisma.post.findMany()
  
        return c.json({ posts: posts})
      }catch(e :any){
        c.status(500)
        return c.json({message: e.message})
    }
})


postRoutes.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())
    const postId = c.req.param('id')

    
    try{
        const post = await prisma.post.findFirst({
            where: {
                id: postId
            }
        })
  
        return c.json({ post: post})
      }catch(e :any){
        c.status(500)
        return c.json({message: e.message})
    }
})

