import { backlogItemsService } from '../services/BacklogItemsService.js'
import BaseController from '../utils/BaseController.js'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from '../utils/Logger.js'

export class BacklogItemsController extends BaseController {
  constructor() {
    super('api/projects/:projectId/backlog')
    this.router
      .get('', this.getBacklogItems)
      .get('/:backlogItemId', this.getBacklogItem)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBacklogItem)
      .put('/:backlogItemId', this.editBacklogItem)
      // .put('/:sprintId', this.editBacklogItem)
      .delete('/:backlogItemId', this.removeBacklogItem)
  }

  async getBacklogItems(req, res, next) {
    try {
      const backlogItems = await backlogItemsService.getBacklogItems(req.query)
      res.send(backlogItems)
    } catch (error) {
      next(error)
    }
  }

  async getBacklogItem(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.getBacklogItemById(req.params.backlogItemId)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async createBacklogItem(req, res, next) {
    try {
      logger.log('Who is this?', req.userInfo)
      req.body.creatorId = req.userInfo.id
      const backlogItem = await backlogItemsService.createBacklogItem(req.body)
      backlogItem.creator = req.userInfo
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async removeBacklogItem(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.removeBacklogItem(req.params.backlogItemId, req.userInfo.id)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async editBacklogItem(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.editBacklogItem(req.params.backlogItemId, req.userInfo.id, req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }
}
