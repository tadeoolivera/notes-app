import { NoteController } from '../controllers/notes.js'
import { noteBodySchema } from '../schemas/note.js'

export default async function notesRoutes(app, { noteModel }) {
  const noteController = new NoteController({ noteModel })

  const onRequest = [app.authenticate]

  app.get('/notes', { onRequest }, noteController.getAll)
  app.get('/notes/:id', { onRequest }, noteController.getById)
  app.post('/notes', { onRequest, schema: { body: noteBodySchema } }, noteController.create)
  app.put('/notes/:id', { onRequest }, noteController.update)
  app.delete('/notes/:id', { onRequest }, noteController.delete)
}