import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class BacklogItemsService {
  async getBacklogItemById(backlogItemId) {
    const backlogItem = await dbContext.BacklogItems.findById(backlogItemId).populate('creator', 'name picture')
    if (!backlogItem) {
      throw new BadRequest('invalid backlogItem id')
    }
    return backlogItem
  }

  async editBacklogItem(backlogItemId, userId, backlogItemData) {
    const backlogItem = await this.getBacklogItemById(backlogItemId)
    if (userId !== backlogItem.creatorId.toString()) {
      throw new Forbidden('not authorized')
    }
    backlogItem.name = backlogItemData.name || backlogItem.name
    backlogItem.description = backlogItemData.description || backlogItem.description
    backlogItem.status = backlogItemData.status || backlogItem.status
    backlogItem.projectId = backlogItemData.projectId || backlogItem.projectId
    backlogItem.sprintId = backlogItemData.sprintId || backlogItem.sprintId
    backlogItem.creatorId = backlogItemData.creatorId || backlogItem.creatorId
    backlogItem.color = backlogItemData.color || backlogItem.color
    await backlogItem.save()
    return backlogItem
  }

  async removeBacklogItem(backlogItemId, userId) {
    const backlogItem = await this.getBacklogItemById(backlogItemId)
    if (userId !== backlogItem.creatorId.toString()) {
      throw new Forbidden('You are not authorized')
    }
    await backlogItem.remove()
    return backlogItem
  }

  async createBacklogItem(backlogItemData) {
    const backlogItem = await dbContext.BacklogItems.create(backlogItemData)
    // await backlogItem.populate('creator', 'name picture').execPopulate()
    return backlogItem
  }

  async getBacklogItems(query) {
    const backlogItems = await dbContext.BacklogItems.find(query).populate('creator', 'name picture')
    return backlogItems
  }
}

export const backlogItemsService = new BacklogItemsService()
