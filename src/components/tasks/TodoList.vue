<template>
  <div class="w-full mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Task List</h2>
      <router-link
        to="/tasks/create"
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Create New Task
      </router-link>
    </div>

    <!-- Search Bar -->
    <div class="mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search tasks..."
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <!-- Task Table -->
    <div v-else class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full table-auto">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Created
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Updated
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Created By
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="task in filteredTasks" :key="task.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                type="checkbox"
                :checked="task.completed"
                @change="toggleComplete(task)"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </td>
            <td class="px-6 py-4">
              <span :class="[task.completed ? 'text-gray-400 line-through' : 'text-gray-900']">
                {{ task.title }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span :class="[task.completed ? 'text-gray-400' : 'text-gray-600']">
                {{ task.description }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(task.created_at) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(task.updated_at) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ task.creator.username.toUpperCase() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <div class="flex space-x-2">
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
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="filteredTasks.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">
          {{
            tasks.length === 0
              ? 'No tasks found. Create one to get started!'
              : 'No matching tasks found.'
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useToastMessages } from '@/utils/toast'
const { taskCreated, taskUpdated, taskLoadError, taskSaveError, taskDeleted } = useToastMessages()
import { taskService } from '@/api/services/task'
import { formatDate } from '@/utils/dateFormatter'

const tasks = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')

// Computed property for filtered tasks
const filteredTasks = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return tasks.value.filter(
    (task) =>
      task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query),
  )
})

const fetchTasks = async () => {
  loading.value = true
  try {
    const response = await taskService.getAllTasks()
    console.log(response)
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
