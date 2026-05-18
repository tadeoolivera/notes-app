import { AuthController } from '../controllers/auth.js'
import { registerSchema, loginSchema } from '../schemas/user.js'

export default async function authRoutes(app, { userModel }) {
  const authController = new AuthController({ userModel })

  app.post('/auth/register', {
    schema: { body: registerSchema }
  }, authController.register)

  app.post('/auth/login', {
    schema: { body: loginSchema }
  }, authController.login)
}