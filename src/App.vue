<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="leading-normal max-h-screen">
    <div class="wrapper">
      <nav class="w-full text-center text-xs mt-8">
        <RouterLink
          to="/"
          class="inline-block px-4 [&.router-link-exact-active]:text-[var(--color-text)] [&.router-link-exact-active:hover]:bg-transparent first:border-0 border-l border-[var(--color-border)]"
        >
          Home
        </RouterLink>

        <!-- <RouterLink
          to="/tasks"
          class="inline-block px-4 [&.router-link-exact-active]:text-[var(--color-text)] [&.router-link-exact-active:hover]:bg-transparent first:border-0 border-l border-[var(--color-border)]"
        >
          Tasks
        </RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<!-- For larger screens (1024px and up) -->
<style scoped>
@media (min-width: 1024px) {
  header {
    @apply flex items-center pr-[calc(var(--section-gap)/2)];
  }

  .logo {
    @apply m-0 mr-8;
  }

  header .wrapper {
    @apply flex items-start flex-wrap;
  }

  nav {
    @apply text-left -ml-4 text-base p-4 mt-4;
  }
}
</style>
