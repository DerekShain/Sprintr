import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class SprintsService {
  async getSprintById(sprintId) {
    const sprint = await dbContext.Sprints.findById(sprintId).populate('creator', 'name picture')
    if (!sprint) {
      throw new BadRequest('Invalid Sprint Id')
    }
    return sprint
  }

  async editSprint(sprintId, userId, sprintData) {
    const sprint = await this.getSprintById(sprintId)
    if (userId !== sprint.creatorId.toString()) {
      throw new Forbidden('Sorry')
    }
    sprint.name = sprintData.name || sprint.name
    sprint.startDate = sprintData.startDate || sprint.startDate
    sprint.endDate = sprintData.endDate || sprint.endDate
    sprint.description = sprintData.description || sprint.description
    sprint.creatorId = sprintData.creatorId || sprint.creatorId
    await sprint.save()
    return sprint
  }

  async removeSprint(sprintId, userId) {
    const sprint = await this.getSprintById(sprintId)
    if (userId !== sprint.creatorId.toString()) {
      throw new Forbidden('You shall not pass!!!')
    }
    await sprint.remove()
    return sprint
  }

  async createSprint(sprintData) {
    const sprint = await dbContext.Sprints.create(sprintData)
    return sprint
  }

  async getSprints(query) {
    const sprints = await dbContext.Sprints.find(query).populate('creator', 'name picture')
    return sprints
  }
}

export const sprintsService = new SprintsService()
