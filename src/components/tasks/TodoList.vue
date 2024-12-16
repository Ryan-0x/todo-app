<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Task List</h2>
      <router-link
        to="/tasks/create"
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Create New Task
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <!-- Task List -->
    <div v-else class="space-y-4">
      <div v-for="task in tasks" :key="task.id" class="bg-white shadow-md rounded-lg p-4">
        <div class="flex items-start justify-between">
          <div class="flex items-start space-x-3 flex-1">
            <input
              type="checkbox"
              :checked="task.completed"
              @change="toggleComplete(task)"
              class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div class="w-full">
              <h3
                :class="[
                  'text-lg font-medium',
                  task.completed ? 'text-gray-400 line-through' : 'text-gray-900',
                ]"
              >
                {{ task.title }}
              </h3>
              <p :class="['text-sm mt-1', task.completed ? 'text-gray-400' : 'text-gray-600']">
                {{ task.description }}
              </p>
              <div class="mt-2 text-xs text-gray-500 space-y-1">
                <p>Created: {{ formatDate(task.created_at) }}</p>
                <p>Last Updated: {{ formatDate(task.updated_at) }}</p>
              </div>
            </div>
          </div>

          <div class="flex space-x-2 ml-4">
            <router-link
              :to="`/tasks/${task.id}`"
              class="text-blue-500 hover:text-blue-600 font-medium"
            >
              Edit
            </router-link>
            <button
              @click="deleteTask(task.id)"
              class="text-red-500 hover:text-red-600 font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="tasks.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
        <p class="text-gray-500 text-lg">No tasks found. Create one to get started!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToastMessages } from '@/utils/toast'
const { taskCreated, taskUpdated, taskLoadError, taskSaveError, taskDeleted } = useToastMessages()
import { taskService } from '@/api/services/task'
import { formatDate } from '@/utils/dateFormatter'
const tasks = ref([])
const loading = ref(true)
const error = ref(null)

const fetchTasks = async () => {
  loading.value = true
  try {
    const response = await taskService.getAllTasks()

    tasks.value = response
  } catch (err) {
    taskLoadError()
    error.value = 'Failed to fetch tasks'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const toggleComplete = async (task) => {
  try {
    await taskService.updateTask(task.id, {
      completed: !task.completed,
    })
    task.completed = !task.completed
    taskUpdated()
  } catch (err) {
    taskSaveError()
    console.error('Failed to update task:', err)
  }
}

const deleteTask = async (id) => {
  if (!confirm('Are you sure you want to delete this task?')) return

  try {
    await taskService.deleteTask(id)
    tasks.value = tasks.value.filter((task) => task.id !== id)
    taskDeleted()
  } catch (err) {
    taskSaveError()
    console.error('Failed to delete task:', err)
  }
}

onMounted(fetchTasks)
</script>
