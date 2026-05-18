import NoteCard from './NoteCard'

const ROTATIONS = [-4, 2, -3, 3, -2, 4, -1, 2]

function Rope() {
  return (
    <div className='rope-section'>
      <svg
        className='rope-svg'
        viewBox='0 0 680 40'
        preserveAspectRatio='none'
        aria-hidden='true'
      >
        <path
          d='M0,22 Q170,14 340,22 Q510,30 680,22'
          stroke='rgba(0,0,0,0.35)'
          strokeWidth='4'
          fill='none'
          strokeLinecap='round'
        />
        <path
          d='M0,20 Q170,12 340,20 Q510,28 680,20'
          stroke='#c8a030'
          strokeWidth='3'
          fill='none'
          strokeLinecap='round'
        />
        <path
          d='M0,19 Q170,11 340,19 Q510,27 680,19'
          stroke='rgba(255,220,100,0.35)'
          strokeWidth='1'
          fill='none'
          strokeLinecap='round'
        />
      </svg>
    </div>
  )
}

export default function NoteList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return <p className='empty'>No notes yet</p>
  }

  const rows = []
  const perRow = 5
  for (let i = 0; i < notes.length; i += perRow) {
    rows.push(notes.slice(i, i + perRow))
  }

  return (
    <div className='notes-wall'>
      {rows.map((rowNotes, rowIndex) => (
        <div className='rope-row' key={rowIndex}>
          <Rope />
          <div className='cards-row'>
            {rowNotes.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                rotation={ROTATIONS[(rowIndex * perRow + index) % ROTATIONS.length]}
                onEdit={() => onEdit(note)}
                onDelete={() => onDelete(note.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}