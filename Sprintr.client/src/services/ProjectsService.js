import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'
import { Project } from '../models/Project.js'

class ProjectsService {
  async createProject(newProject) {
    const res = await api.post('api/projects', newProject)
    AppState.projects.unshift(new Project(res.data))
    logger.log('create project res', res)
  }
}

export const projectsService = new ProjectsService()
