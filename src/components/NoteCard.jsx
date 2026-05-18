export default function NoteCard({ note, onEdit, onDelete, rotation = 0 }) {
  return (
    <div className='card-hang'>
      <div className='pin' />

      <div
        className='note-card'
        style={{
          backgroundColor: note.color || '#fffef7',
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'top center',
        }}
      >
        {note.image_url && (
          <div className='card-photo'>
            <img src={note.image_url} alt={note.title} />
          </div>
        )}

        <div className='card-body'>
          <h3 className='card-title'>{note.title}</h3>
          <p className='card-content'>{note.content}</p>

          <div className='card-footer'>
            <small className='card-date'>
              {new Date(note.updated_at).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </small>

            <div className='card-actions'>
              <button className='action-btn' onClick={onEdit} title='Edit'>✏️</button>
              <button className='action-btn' onClick={onDelete} title='Delete'>🗑️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}