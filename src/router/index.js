import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '@/components/tasks/TodoList.vue'
import TodoForm from '@/components/tasks/TodoForm.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tasks',
      name: 'TodoList',
      component: TodoList,
      meta: { requiresAuth: true },
    },
    {
      path: '/tasks/create',
      name: 'CreateTodo',
      component: TodoForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/tasks/:id',
      name: 'EditTodo',
      component: TodoForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresGuest: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  console.log(to.meta.requiresAuth, auth.isAuthenticated)
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && auth.isAuthenticated) {
    next('/tasks')
  } else {
    next()
  }
})

export default router
