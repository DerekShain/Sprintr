import { AppState } from '../AppState.js'
import { Sprint } from '../models/Sprint.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class SprintsService {
  async getSprints(projectId, query = '') {
    AppState.sprints = []
    const res = await api.get(`api/projects/${projectId}/sprints` + query)
    AppState.sprints = res.data.map(s => new Sprint(s))
  }

  async getSprintById(projectId, sprintId) {
    AppState.sprint = null
    const res = await api.get(`api/projects/${projectId}/sprints/${sprintId}`)
    AppState.sprint = new Sprint(res.data)
  }

  async createSprint(projectId, sprint) {
    const res = await api.post(`api/projects/${projectId}/sprints`, sprint)
    AppState.sprint.push(new Sprint(res.data, projectId))
    logger.log('create sprint res', res)
    return res.data.id
  }

  async removeSprint(projectId, sprintId) {
    const res = await api.delete(`api/projects/${projectId}/sprints/${sprintId}`)
    AppState.sprint = null
    logger.log('log the res', res)
    AppState.sprints = AppState.sprints.filter(s => s.id !== sprintId)
  }
}

export const sprintsService = new SprintsService()
