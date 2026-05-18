import db from '../db.js'

export class NoteModel {
  static getAll({ userId }) {
    return db.prepare(
      'SELECT * FROM notes WHERE user_id = ? ORDER BY updated_at DESC'
    ).all(userId)
  }

  static getById({ id, userId }) {
    return db.prepare(
      'SELECT * FROM notes WHERE id = ? AND user_id = ?'
    ).get(id, userId)
  }

  static create({ title, content = '', color = '#ffffff', userId }) {
    const result = db.prepare(
      'INSERT INTO notes (title, content, color, user_id) VALUES (?, ?, ?, ?)'
    ).run(title, content, color, userId)
    return NoteModel.getById({ id: result.lastInsertRowid, userId })
  }

  static update(id, { title, content, color, userId }) {
    const now = new Date().toISOString()
    db.prepare(
      'UPDATE notes SET title=?, content=?, color=?, updated_at=? WHERE id=? AND user_id=?'
    ).run(title, content, color, now, id, userId)
    return NoteModel.getById({ id, userId })
  }

  static delete({ id, userId }) {
    return db.prepare(
      'DELETE FROM notes WHERE id = ? AND user_id = ?'
    ).run(id, userId)
  }
}