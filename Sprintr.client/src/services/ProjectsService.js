import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'
import { Project } from '../models/Project.js'
import { convertToQuery } from '../utils/Query.js'

class ProjectsService {
  async createProject(newProject) {
    const res = await api.post('api/projects', newProject)
    AppState.projects.push(new Project(res.data))
    logger.log('create project res', res)
  }

  async getProjectById(projectId) {
    AppState.projects = null
    const res = await api.get(`api/projects/${projectId}`)
    AppState.project = new Project(res.data)
  }

  async getProjects(query = {}) {
    AppState.projects = []
    const res = await api.get('api/projects' + convertToQuery(query))
    logger.log('project res', res)
    AppState.projects = res.data.map(p => new Project(p))
  }

  async deleteProject(projectId) {
    const res = await api.delete('api/projects/' + projectId)
    logger.log('delete project res', res)
    AppState.projects = AppState.projects.filter(p => p.id !== projectId)
  }
}

export const projectsService = new ProjectsService()
