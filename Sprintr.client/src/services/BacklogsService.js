import { AppState } from '../AppState.js'
import { Backlog } from '../models/Backlog.js'
import { api } from './AxiosService.js'

class BacklogsService {
  async getBacklogs(query = '') {
    AppState.backlogs = []
    const res = await api.get('api/projects/:projectId/backlogs' + query)
    AppState.backlogs = res.data.map(c => new Backlog(c))
  }

  async getBacklogById(backlogId) {
    AppState.backlog = null
    const res = await api.get(`api/projects/:projectId/backlogs/${backlogId}`)
    AppState.backlog = new Backlog(res.data)
  }

  async createBacklog(backlog) {
    const res = await api.post('api/projects/:projectId/backlogs', backlog)
    AppState.backlogs.push(new Backlog(res.data))
  }

  async editBacklog(backlog) {
    const res = await api.put(`api/projects/:projectId/backlogs/${backlog.id}`, backlog)
    AppState.backlog = new Backlog(res.data)
  }

  async removeBacklog(backlogId) {
    await api.delete(`api/projects/:projectId/backlogs/${backlogId}`)
    AppState.backlog = null
    AppState.backlogs.filter(c => c.id !== backlogId)
  }
}

export const backlogsService = new BacklogsService()
