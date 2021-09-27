import { Auth0Provider } from '@bcwdev/auth0provider'
import { sprintsService } from '../services/SprintsService.js'
import BaseController from '../utils/BaseController.js'
import { logger } from '../utils/Logger.js'

export class SprintsController extends BaseController {
  constructor() {
    super('api/sprints')
    this.router
      .get('', this.getSprints)
      .get('/:sprintId', this.getSprint)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createSprint)
      .delete('/:sprintId', this.removeSprint)
      .put('/:sprintId', this.editSprint)
  }

  async getSprints(req, res, next) {
    try {
      const sprints = await sprintsService.getSprints(req.query)
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async getSprint(req, res, next) {
    try {
      const sprint = await sprintsService.getSprintById(req.params.sprintId)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async createSprint(req, res, next) {
    try {
      logger.log('who is the user?', req.userInfo)
      req.body.creatorId = req.userInfo.id
      const sprint = await sprintsService.createSprint(req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async removeSprint(req, res, next) {
    try {
      const sprint = await sprintsService.removeSprint(req.params.sprintId, req.userInfo.id)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async editSprint(req, res, next) {
    try {
      const sprint = await sprintsService.editSprint(req.params.sprintId, req.userInfo.id, req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }
}
