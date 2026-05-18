import { useState, useEffect } from 'react'
import { api } from './services/notes'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import Login from './pages/Login'
import Register from './pages/Register'
import './styles/App.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('login')
  const [notes, setNotes] = useState([])
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState(null)

  const load = async () => {
    try {
      const data = await api.getAll()
      setNotes(data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    if (!user) return

    const fetchNotes = async () => {
      try {
        const data = await api.getAll()
        setNotes(data)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchNotes()
  }, [user])

  const handleLogin = (userData) => {
    setUser(userData)
    setPage('app')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setNotes([])
    setPage('login')
  }

  const handleSave = async (data) => {
    try {
      if (editing) {
        await api.update(editing.id, data)
        setEditing(null)
      } else {
        await api.create(data)
      }
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(id)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  if (page === 'login') {
    return <Login onLogin={handleLogin} onGoRegister={() => setPage('register')} />
  }

  if (page === 'register') {
    return <Register onLogin={handleLogin} onGoLogin={() => setPage('login')} />
  }

  return (
    <div className='wall'>
      <div className='overlay'>

        <header className='topbar'>
          <h1>My Notes ♡</h1>

          <div className='user-info'>
            <span>Hello, {user?.email}</span>

            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {error && (
          <p className='error-message'>
            {error}
          </p>
        )}

        <NoteForm
          onSave={handleSave}
          editing={editing}
          onCancel={() => setEditing(null)}
        />

        <div className='notes-wall'>
          <div className='string' />

          <NoteList
            notes={notes}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        </div>

      </div>
    </div>
  )
}