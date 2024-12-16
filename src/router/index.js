import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tasks',
      name: 'TodoList',
      component: () => import('@/components/tasks/TodoList.vue'),
    },
    {
      path: '/tasks/create',
      name: 'CreateTodo',
      component: () => import('@/components/tasks/TodoForm.vue'),
    },
    {
      path: '/tasks/:id',
      name: 'EditTodo',
      component: () => import('@/components/tasks/TodoForm.vue'),
    },
  ],
})

export default router
