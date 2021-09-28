import { AppState } from '../AppState.js'
import { Sprint } from '../models/Sprint.js'
import { api } from './AxiosService.js'

class SprintsService {
  async getSprints(query = '') {
    AppState.sprints = []
    const res = await api.get('api/projects/:projectId/sprints' + query)
    AppState.sprints = res.data.map(s => new Sprint(s))
  }

  async getSprintById(sprintId) {
    AppState.sprint = null
    const res = await api.get(`api/projects/:projectId/sprints/${sprintId}`)
    AppState.sprint = new Sprint(res.data)
  }

  async createSprint(sprint) {
    const res = await api.put('api/projects/:projectId/sprints', sprint)
    AppState.sprint.push(new Sprint(res.data))
  }

  async removeSprint(sprintId) {
    await api.delete(`api/projects/:projectId/sprints/${sprintId}`)
    AppState.sprint = null
    AppState.sprints.filter(s => s.id !== sprintId)
  }
}

export const sprintsService = new SprintsService()
