// src/stores/auth.js
import { defineStore } from 'pinia'
import { userService } from '@/api/services/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(email, password) {
      try {
        const response = await userService.loginUser({
          username: email,
          password,
        })

        this.token = response.access_token
        localStorage.setItem('token', this.token)
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },

    async register(username, email, password) {
      try {
        const response = await userService.registerUser({
          username,
          email,
          password,
        })

        return true
      } catch (error) {
        console.error('Registration failed:', error)
        return false
      }
    },

    logout() {
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
