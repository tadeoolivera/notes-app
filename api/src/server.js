import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import notesRoutes from './routes/notes.js'
import authRoutes from './routes/auth.js'
import { NoteModel } from './models/Note.js'
import { UserModel } from './models/User.js'

const app = Fastify({ logger: true })

await app.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
})

await app.register(jwt, {
  secret: process.env.JWT_SECRET
})

app.decorate('authenticate', async (req, reply) => {
  try {
    await req.jwtVerify()
  } catch (err) {
    return reply.code(401).send(err, { error: 'Invalid or expired token' })
  }
})

await app.register(authRoutes, { 
  prefix: '/api',
  userModel: UserModel
})

await app.register(notesRoutes, {
  prefix: '/api',
  noteModel: NoteModel
})

try {
  await app.listen({ port: 3000 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}