import { useState } from 'react'
import { authService } from '../services/auth'
import '../styles/auth.css'

export default function Login({ onLogin, onGoRegister }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await authService.login(form)
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
        <h2>Sign In</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit} className='auth-form'>
          <input
            type='email'
            placeholder='Email'
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
          <button type='submit' disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <p>Don't have an account? <button onClick={onGoRegister}>Register</button></p>
      </div>
    </div>
  )
}