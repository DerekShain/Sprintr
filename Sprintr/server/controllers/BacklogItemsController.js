import { backlogItemsService } from '../services/BacklogItemsService.js'
import BaseController from '../utils/BaseController.js'
import { Auth0Provider } from '@bcwdev/auth0provider'
export class BacklogItemsController extends BaseController {
  constructor() {
    super('api/projects/:projectId')
    this.router
      .get('/backlog', this.getBacklogItems)
      .get('/backlog/:backlogItemId', this.getBacklogItem)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/backlog', this.createBacklogItem)
      .put('/backlog/:backlogItemId', this.editBacklogItem)
      .delete('/backlog/:backlogItemId', this.removeBacklogItem)
  }

  async getBacklogItems(req, res, next) {
    try {
      const backlogItems = await backlogItemsService.getBacklogItems({ projectId: req.params.projectId })
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
      req.body.creatorId = req.userInfo.id
      req.body.backlogId = req.params.backlogId
      req.body.projectId = req.params.projectId
      const backlogItem = await backlogItemsService.createBacklogItem(req.body)
      backlogItem.creator = req.userInfo
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async removeBacklogItem(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const backlogItem = await backlogItemsService.removeBacklogItem(req.params.backlogItemId, req.userInfo.id)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async editBacklogItem(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.editBacklogItem(req.params.backlogItemId, req.userInfo.id, req.body.backlog || req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }
}
