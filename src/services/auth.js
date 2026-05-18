const URL = 'http://localhost:3000/api'

export const authService = {
  register: async (data) => {
    const res = await fetch(`${URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error)
    }
    return res.json()
  },

  login: async (data) => {
    const res = await fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error)
    }
    return res.json()
  }
}