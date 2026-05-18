const URL = 'http://localhost:3000/api'

const getToken = () => localStorage.getItem('token')

const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
})

export const api = {
  getAll: async () => {
    const res = await fetch(`${URL}/notes`, { headers: headers() })
    if (!res.ok) throw new Error('Failed to fetch notes')
    return res.json()
  },

  getById: async (id) => {
    const res = await fetch(`${URL}/notes/${id}`, { headers: headers() })
    if (!res.ok) throw new Error('Failed to fetch note')
    return res.json()
  },

  create: async (data) => {
    const res = await fetch(`${URL}/notes`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to create note')
    return res.json()
  },

  update: async (id, data) => {
    const res = await fetch(`${URL}/notes/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to update note')
    return res.json()
  },

  delete: async (id) => {
    const res = await fetch(`${URL}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
    if (!res.ok) throw new Error('Failed to delete note')
  }
}