export class NoteController {
  constructor({ noteModel }) {
    this.noteModel = noteModel
  }

  getAll = async (req, reply) => {
    const notes = this.noteModel.getAll({ userId: req.user.id })
    return reply.send(notes)
  }

  getById = async (req, reply) => {
    const note = this.noteModel.getById({ id: req.params.id, userId: req.user.id })
    if (!note) return reply.code(404).send({ error: 'Note not found' })
    return reply.send(note)
  }

  create = async (req, reply) => {
    try {
      const note = this.noteModel.create({ ...req.body, userId: req.user.id })
      return reply.code(201).send(note)
    } catch (err) {
      return reply.code(400).send({ error: err.message })
    }
  }

  update = async (req, reply) => {
    const note = this.noteModel.update(req.params.id, { ...req.body, userId: req.user.id })
    if (!note) return reply.code(404).send({ error: 'Note not found' })
    return reply.send(note)
  }

  delete = async (req, reply) => {
    this.noteModel.delete({ id: req.params.id, userId: req.user.id })
    return reply.code(204).send(null)
  }
}