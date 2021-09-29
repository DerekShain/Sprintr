import { AppState } from '../AppState.js'
import { Task } from '../models/Task.js'
import { api } from './AxiosService.js'

class TasksService {
  async getTasks(query = '') {
    AppState.tasks = []
    const res = await api.get('api/projects/:projectId/tasks/:taskId/tasks' + query)
    AppState.tasks = res.data.map(t => new Task(t))
  }
}
export const tasksService = new TasksService()
