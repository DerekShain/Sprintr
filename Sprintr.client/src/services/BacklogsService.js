import { AppState } from '../AppState.js'
import { Backlog } from '../models/Backlog.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class BacklogsService {
  async getBacklogs(projectId, query = '') {
    AppState.backlogs = []
    const res = await api.get(`api/projects/${projectId}/backlog`, +query)
    AppState.backlogs = res.data.map(c => new Backlog(c))
  }

  async getBacklogById(projectId, backlogId) {
    AppState.backlog = null
    const res = await api.get(`api/projects/${projectId}/backlogs/${backlogId}`)
    AppState.backlog = new Backlog(res.data)
  }

  async createBacklog(projectId, backlog) {
    const res = await api.post(`api/projects/${projectId}/backlog`, backlog)
    AppState.backlogs.push(new Backlog(res.data, projectId))
    return res.data.id
  }

  async editBacklog(projectId, backlog) {
    const res = await api.put(`api/projects/${projectId}/backlogs/${backlog.id}`, backlog)
    AppState.backlog = new Backlog(res.data)
  }

  async removeBacklog(projectId, backlogId) {
    // AppState.backlog = ''
    logger.log(backlogId)
    const res = await api.delete(`api/projects/${projectId}/backlog/`, +backlogId)
    logger.log('log the res', res)
    // AppState.backlogs.filter(c => c.id !== backlogId)
  }
}

export const backlogsService = new BacklogsService()
