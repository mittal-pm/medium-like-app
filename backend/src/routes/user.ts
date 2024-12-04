import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}

export const userRoutes = new Hono<{Bindings: Bindings}>();


userRoutes.post('/signup', async (c) => {
    try{
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())
    
      const body = await  c.req.json()
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password
        }
      })
    
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ message : 'User Created Successfully', token: jwt })
    }catch(e :any){
      c.status(500)
      return c.json({message: e.message})
    }
})
  
userRoutes.post('/signin', async(c) => {
    try{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    const body = await  c.req.json()
    const user = await prisma.user.findFirst({
        where: {
        email: body.email,
        password: body.password
        }
    })

    if(!user){
        throw new Error('Incorrect Credentials')
    }
    
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ message : 'User SignedIn Successfully', token: jwt, id: user.id })
    }catch(e :any){
    c.status(500)
    return c.json({message: e.message})
    }
})