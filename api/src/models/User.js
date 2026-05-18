import db from '../db.js'
import bcrypt from 'bcrypt'

export class UserModel {
  static async create({ email, password }) {
    const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    if (existing) throw new Error('Email already in use')

    const hashedPassword = await bcrypt.hash(password, 10)
    const result = db.prepare(
      'INSERT INTO users (email, password) VALUES (?, ?)'
    ).run(email, hashedPassword)

    return { id: result.lastInsertRowid, email }
  }

  static async login({ email, password }) {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    if (!user) throw new Error('Email or password incorrect')

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new Error('Email or password incorrect')

    return { id: user.id, email: user.email }
  }
}