<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useToastMessages } from '@/utils/toast'
const { loginSuccess, loginError } = useToastMessages()
const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  const success = await auth.login(email.value, password.value)
  if (success) {
    router.push('/tasks') // or wherever you want to redirect after login
    loginSuccess()
  } else {
    error.value = 'Login failed. Please check your credentials.'
    loginError()
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Login</h2>
    <form @submit.prevent="handleLogin">
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
        Login
      </button>
      <div class="mt-4 text-center">
        <RouterLink to="/register" class="text-blue-500 hover:text-blue-600">
          Don't have an account? Register
        </RouterLink>
      </div>
    </form>
  </div>
</template>
