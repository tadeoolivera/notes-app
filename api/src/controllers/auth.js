export class AuthController {
  constructor({ userModel }) {
    this.userModel = userModel
  }

  register = async (req, reply) => {
    try {
      const user = await this.userModel.create(req.body)
      const token = await reply.jwtSign({ id: user.id, email: user.email })
      return reply.code(201).send({ token, user })
    } catch (err) {
      return reply.code(400).send({ error: err.message })
    }
  }

  login = async (req, reply) => {
    try {
      const user = await this.userModel.login(req.body)
      const token = await reply.jwtSign({ id: user.id, email: user.email })
      return reply.send({ token, user })
    } catch (err) {
      return reply.code(401).send({ error: err.message })
    }
  }
}