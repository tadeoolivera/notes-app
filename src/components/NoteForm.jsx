import { useState, useEffect } from 'react'

const COLORS = [
  '#fffef7',
  '#fef3c7',
  '#dbeafe',
  '#d1fae5',
  '#fce7f3',
  '#ede9fe',
]

export default function NoteForm({ onSave, editing, onCancel }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: '',
    content: '',
    color: '#fffef7',
  })

  useEffect(() => {
    if (editing) {
      setForm(editing)
      setOpen(true)
    }
  }, [editing])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onSave(form)
    setForm({ title: '', content: '', color: '#fffef7' })
    setOpen(false)
  }

  const handleCancel = () => {
    setForm({ title: '', content: '', color: '#fffef7' })
    setOpen(false)
    onCancel?.()
  }

  if (!open) {
    return (
      <div className='new-note-bar'>
        <button className='new-note-btn' onClick={() => setOpen(true)}>
          + New Note
        </button>
      </div>
    )
  }

  return (
    <div className='form-overlay'>
      <form className='note-form' onSubmit={handleSubmit}>
        <h2 className='form-title'>
          {editing ? 'Edit note' : 'New note'}
        </h2>

        <input
          className='note-input'
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder='Title...'
          required
        />

        <textarea
          className='note-textarea'
          value={form.content}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          placeholder='Write your note...'
          rows={5}
        />

        <div className='color-picker'>
          <span className='color-label'>Color:</span>
          <div className='colors'>
            {COLORS.map((c) => (
              <button
                type='button'
                key={c}
                className='color-btn'
                style={{
                  background: c,
                  outline: form.color === c ? '3px solid #553c23' : '2px solid #c19c6988',
                }}
                onClick={() => setForm((f) => ({ ...f, color: c }))}
              />
            ))}
          </div>
        </div>

        <div className='form-actions'>
          <button type='submit' className='save-btn'>
            {editing ? 'Save' : 'Create note'}
          </button>
          <button type='button' className='cancel-btn' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
