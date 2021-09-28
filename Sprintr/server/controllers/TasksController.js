import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService.js'
import BaseController from '../utils/BaseController.js'
import { logger } from '../utils/Logger.js'

export class TasksController extends BaseController {
  constructor() {
    super('api/projects/:projectId/tasks')
    this.router
      .get('', this.getTasks)
      .get('/:taskId', this.getTask)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTask)
      .delete('/:taskId', this.removeTask)
      .put('/:taskId', this.editTask)
  }

  async getTasks(req, res, next) {
    try {
      const tasks = await tasksService.getTasks(req.query)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getTask(req, res, next) {
    try {
      const task = await tasksService.getTaskById(req.params.taskId)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      logger.log('who is the user?', req.userInfo)
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.createTask(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async removeTask(req, res, next) {
    try {
      const task = await tasksService.removeTask(req.params.taskId, req.userInfo.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      const task = await tasksService.editTask(req.params.taskId, req.userInfo.id, req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }
}
