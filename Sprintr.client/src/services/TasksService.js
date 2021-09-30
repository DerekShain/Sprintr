import { AppState } from '../AppState.js'
import { Task } from '../models/Task.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class TasksService {
  async getTasks(projectId, query = '') {
    AppState.tasks = []
    const res = await api.get(`api/projects/${projectId}/tasks` + query)
    AppState.tasks = res.data.map(t => new Task(t))
  }

  async getTaskById(projectId, taskId) {
    AppState.task = null
    const res = await api.get(`api/projects/${projectId}/tasks/${taskId}`)
    AppState.task = new Task(res.data)
  }

  async createTask(projectId, backlogId, task) {
    const res = await api.post(`api/projects/${projectId}/tasks`, task)
    AppState.tasks.push(new Task(res.data, projectId, backlogId))
    logger.log('create task res', res)
    return res.data.id
  }

  async editTask(projectId, task) {
    const res = await api.put(`api/projects/${projectId}/tasks/${task.id}`, task)
    AppState.task = new Task(res.data)
  }

  async removeTask(projectId, taskId) {
    await api.delete(`api/projects/${projectId}/tasks/${taskId}`)
    // NOTE vvv dont forget this to filter everything
    AppState.tasks = AppState.tasks.filter(t => t.id !== taskId)
  }

  async toggleComplete(projectId, taskId) {
    const task = AppState.tasks.find(t => t.id === taskId)
    logger.log(task)
    // NOTE vvv can use this
    // if (task.isComplete === false) {
    //   task.isComplete = true
    // } else {
    //   task.isComplete = false
    // }
    // NOTE vvv or line 47. 48 needs to say.
    task.isComplete = !task.isComplete
    await api.put(`api/projects/${projectId}/tasks/${taskId}`, task)
  }
}
export const tasksService = new TasksService()
