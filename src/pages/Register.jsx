import { useState } from 'react'
import { authService } from '../services/auth'
import '../styles/auth.css'

export default function Register({ onLogin, onGoLogin }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await authService.register(form)
      localStorage.setItem('token', data.token)
      onLogin(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-layout'>
      <div className='auth-card'>
        <h2>Create Account</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit} className='auth-form'>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          <input
            type="password"
            placeholder="Password (minimum 6 characters)"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>
        <p>Already have an account? <button onClick={onGoLogin}>Login</button></p>
      </div>
    </div>
  )
}