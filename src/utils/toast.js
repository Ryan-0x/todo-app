// src/utils/toast.js
import { useToast } from 'vue-toastification'

export const useToastMessages = () => {
  const toast = useToast()

  return {
    showSuccess: (message) => toast.success(message),
    showError: (message) => toast.error(message),
    showInfo: (message) => toast.info(message),
    showWarning: (message) => toast.warning(message),

    // Common messages
    taskCreated: () => toast.success('Task created successfully'),
    taskUpdated: () => toast.success('Task updated successfully'),
    taskDeleted: () => toast.success('Task deleted successfully'),
    taskLoadError: () => toast.error('Failed to load task'),
    taskSaveError: () => toast.error('Failed to save task'),
    loginSuccess: () => toast.success('Login successful'),
    loginError: () => toast.error('Login failed'),
    registerSuccess: () => toast.success('Register successful'),
    registerError: () => toast.error('Register failed'),
  }
}
