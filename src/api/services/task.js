import api from '../config'

export const taskService = {
  async getAllTasks() {
    const response = await api.get('/tasks')

    return response.data
  },

  async getTaskById(id) {
    const response = await api.get(`/tasks/${id}`)
    return response.data
  },

  async createTask(task) {
    const response = await api.post('/tasks', task)
    return response.data
  },

  async updateTask(id, task) {
    const response = await api.put(`/tasks/${id}`, task)
    return response.data
  },

  async deleteTask(id) {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
  },
}
