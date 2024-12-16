import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoList from '../components/tasks/TodoList.vue'
import TodoForm from '../components/tasks/TodoForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoList,
    },
    {
      path: '/tasks',
      name: 'TodoList',
      component: TodoList,
    },
    {
      path: '/tasks/create',
      name: 'CreateTodo',
      component: TodoForm,
    },
    {
      path: '/tasks/:id',
      name: 'EditTodo',
      component: TodoForm,
    },
  ],
})

export default router
