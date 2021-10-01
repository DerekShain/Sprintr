import { AppState } from '../AppState.js'
import { Task } from '../models/Task.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class TasksService {
  async getTasks(projectId) {
    // AppState.tasks = []
    const res = await api.get(`api/projects/${projectId}/tasks`)
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

  async toggleComplete(projectId, taskId, tasks) {
    const task = AppState.tasks.find(t => t.id === taskId)
    // NOTE vvv can use this
    // if (task.isComplete === false) {
    //   task.isComplete = true
    // } else {
    //   task.isComplete = false
    // }
    // NOTE vvv or line 47. 48 needs to say.
    task.isComplete = !task.isComplete
    await api.put(`api/projects/${projectId}/tasks/${taskId}`, tasks)
    logger.log('Complete Toggle Service', task)
  }

  async toggleNotComplete(projectId, taskId) {
    const task = AppState.tasks.find(t => t.id === taskId)
    // NOTE vvv can use this
    if (task.isComplete === true) {
      task.isComplete = false
    } else {
      task.isComplete = true
    }
    // NOTE vvv or line 47. 48 needs to say.
    // task.isComplete = !task.isComplete
    await api.put(`api/projects/${projectId}/tasks/${taskId}`, task)
    logger.log('Complete Toggle Service', task)
  }

  async checkTask(projectId, taskId, taskData) {
    const res = await api.put(`api/projects/${projectId}/tasks/${taskId}`, taskData)
    logger.log('if checkbox', res.data)
    logger.log('taskData', taskData)
  }
}
export const tasksService = new TasksService()
