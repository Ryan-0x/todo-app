<template>
  <div>
    <!-- Top Navigation -->
    <nav class="bg-white shadow-lg w-full z-10 border-b border-gray-100">
      <div class="w-full mx-auto px-4 py-3">
        <div class="flex flex-col items-center space-y-3">
          <!-- Brand/Logo -->
          <div class="flex items-center space-x-3">
            <!-- You can add an icon/logo here -->
            <svg
              class="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <span
              class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
            >
              TODO APP
            </span>
          </div>

          <!-- Navigation Links -->
          <div class="flex items-center space-x-1">
            <RouterLink
              to="/tasks"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              :class="[
                $route.path === '/tasks'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700',
              ]"
            >
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Home</span>
              </div>
            </RouterLink>

            <!-- Add Logout Button -->
            <button
              v-if="auth.isAuthenticated"
              @click="handleLogout"
              class="px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
            >
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.router-link-active {
  font-weight: 600;
}
</style>
