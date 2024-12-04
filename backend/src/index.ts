import { Hono } from 'hono'
import { userRoutes } from './routes/user'
import { postRoutes } from './routes/post'


type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}

const app = new Hono<{Bindings: Bindings}>();


app.route('/api/v1/user', userRoutes)
app.route('/api/v1/blog', postRoutes)


export default app
