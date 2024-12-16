// src/components/Register.vue
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useToastMessages } from '@/utils/toast'

const auth = useAuthStore()
const router = useRouter()
const { registerSuccess, registerError } = useToastMessages()

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const handleRegister = async () => {
  try {
    const success = await auth.register(username.value, email.value, password.value)
    if (success) {
      router.push('/login')
      registerSuccess()
    }
  } catch (err) {
    error.value = 'Registration failed. Please try again.'
    console.error('Registration error:', err)
    registerError()
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-4">
        <label class="block mb-2">Username</label>
        <input v-model="username" type="text" class="w-full p-2 border rounded" required />
      </div>
      <div class="mb-4">
        <label class="block mb-2">Email</label>
        <input v-model="email" type="email" class="w-full p-2 border rounded" required />
      </div>
      <div class="mb-4">
        <label class="block mb-2">Password</label>
        <input v-model="password" type="password" class="w-full p-2 border rounded" required />
      </div>
      <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Register
      </button>
      <div class="mt-4 text-center">
        <RouterLink to="/login" class="text-blue-500 hover:text-blue-600">
          Already have an account? Login
        </RouterLink>
      </div>
    </form>
  </div>
</template>
