import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'
import { Project } from '../models/Project.js'

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
}

export const projectsService = new ProjectsService()
