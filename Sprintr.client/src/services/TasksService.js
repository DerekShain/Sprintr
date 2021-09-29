import { AppState } from '../AppState.js'
import { Task } from '../models/Task.js'
import { api } from './AxiosService.js'

class TasksService {
  async getTasks(query = '') {
    AppState.tasks = []
    const res = await api.get('api/projects/:projectId/tasks' + query)
    AppState.tasks = res.data.map(t => new Task(t))
  }

  async getTaskById(taskId) {
    AppState.task = null
    const res = await api.get(`api/projects/:projectId/tasks/${taskId}`)
    AppState.task = new Task(res.data)
  }

  async createTask(task) {
    const res = await api.post('api/projects/:projectId/tasks', task)
    AppState.tasks.push(new Task(res.data))
  }

  async editTask(task) {
    const res = await api.put(`api/projects/:projectId/tasks/${task.id}`, task)
    AppState.task = new Task(res.data)
  }

  async removeTask(taskId) {
    await api.delete(`api/projects/:projectId/tasks/${taskId}`)
    AppState.task = null
    AppState.tasks.filter(t => t.id !== taskId)
  }
}
export const tasksService = new TasksService()
