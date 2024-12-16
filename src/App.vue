<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

const auth = useAuthStore()

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    auth.token = token
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div v-if="auth.isAuthenticated">
      <NavBar />
    </div>

    <RouterView />
  </div>
</template>

<style>
body {
  @apply antialiased;
}

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}
</style>
