<template>
  <div class="max-w-2xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6">
      {{ isEditing ? 'Edit Task' : 'Create Task' }}
    </h2>

    <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded-lg p-6">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2"> Title </label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          required
          placeholder="Enter task title"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-6">
        <label for="description" class="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          id="description"
          v-model="formData.description"
          placeholder="Enter description"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div v-if="isEditing" class="mb-6 text-sm text-gray-500 space-y-1">
        <p>Created: {{ formData.created_at }}</p>
        <p>Last Updated: {{ formData.updated_at }}</p>
      </div>

      <div class="flex gap-4">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {{ isEditing ? 'Update' : 'Create' }}
        </button>
        <button
          v-if="isEditing"
          type="button"
          @click="resetForm"
          class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { taskService } from '@/api/services/task'
import { useToastMessages } from '@/utils/toast'
import { formatDate } from '@/utils/dateFormatter'
const { taskCreated, taskUpdated, taskLoadError, taskSaveError } = useToastMessages()

const route = useRoute()
const router = useRouter()
const taskId = route.params.id
const isEditing = !!taskId

const formData = ref({
  title: '',
  description: '',
  created_by: 0,
})

onMounted(async () => {
  if (isEditing) {
    try {
      const response = await taskService.getTaskById(taskId)
      formData.value = response
      formData.value.created_at = formatDate(formData.value.created_at)
      formData.value.updated_at = formatDate(formData.value.updated_at)
    } catch (error) {
      taskLoadError()
      console.error('Failed to fetch task:', error)
      router.push('/tasks')
    }
  }
})

const handleSubmit = async () => {
  try {
    if (isEditing) {
      await taskService.updateTask(taskId, formData.value)
      taskUpdated()
    } else {
      await taskService.createTask(formData.value)
      taskCreated()
    }
    router.push('/tasks')
  } catch (error) {
    console.error('Failed to save task:', error)
    taskSaveError()
  }
}

const resetForm = () => {
  router.push('/tasks')
}
</script>
