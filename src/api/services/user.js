import api from '../config'
import axios from 'axios'
export const userService = {
  async getAllUsers() {
    const response = await api.get('/users')
    return response.data
  },

  async getUserById(id) {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  async registerUser(user) {
    const response = await api.post('/register', user)
    return response.data
  },

  async loginUser(user) {
    // const response = await axios.post(
    //   '/login',
    //   // The data needs to be in FormData format because of OAuth2PasswordRequestForm
    //   new URLSearchParams({
    //     username: user.username, // Note: the backend expects email in the username field
    //     password: user.password,
    //     grant_type: 'password',
    //     client_id: 'string',
    //     client_secret: 'string',
    //     scope: '',
    //   }),
    //   {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //   },
    // )
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    // Convert the data to x-www-form-urlencoded format
    const formData = new URLSearchParams()
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value)
    })

    const response = await api.post('/login', formData, config)
    return response.data
  },

  async updateUser(id, user) {
    const response = await api.put(`/users/${id}`, user)
    return response.data
  },

  async deleteUser(id) {
    const response = await api.delete(`/users/${id}`)
    return response.data
  },
}
