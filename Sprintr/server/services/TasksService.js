import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class TasksService {
  async getTaskById(taskId) {
    const task = await dbContext.Tasks.findById(taskId).populate('creator', 'name picture')
    if (!task) {
      throw new BadRequest('Invalid Task Id')
    }
    return task
  }

  async editTask(taskId, userId, taskData) {
    const task = await this.getTaskById(taskId)
    if (userId !== task.creatorId.toString()) {
      throw new Forbidden('You shall not pass!!!')
    }
    // task.name = taskData.name || task.name
    // task.id = taskData.id || task.id
    // task.weight = taskData.weight || task.weight
    // task.projectId = taskData.projectId || task.projectId
    // task.backlogItemId = taskData.backlogItemId || task.backlogItemId
    // task.creatorId = taskData.creatorId || task.creatorId
    task.isComplete = taskData.isComplete || task.isComplete
    // task.assignedTo = taskData.assignedTo || task.assignedTo
    await task.save()
    return task
  }

  async removeTask(taskId, userId) {
    const task = await this.getTaskById(taskId)
    if (userId !== task.creatorId.toString()) {
      throw new Forbidden('You shall not pass!!!')
    }
    await task.remove()
    return task
  }

  async createTask(taskData) {
    const task = await dbContext.Tasks.create(taskData)
    return task
  }

  async getTasks(query) {
    const tasks = await dbContext.Tasks.find(query).populate('creator', 'name picture')
    return tasks
  }
}

export const tasksService = new TasksService()
