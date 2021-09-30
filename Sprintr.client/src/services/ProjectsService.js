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
    // NOTE added this populate to see if it will populate a picture.
    // await newProject.populate('creator', 'name picture')
    return res.data.id
  }

  async getProjectById(projectId) {
    AppState.projects = null
    const res = await api.get(`api/projects/${projectId}`)
    AppState.project = new Project(res.data)
  }

  async getProjects() {
    AppState.projects = []
    const res = await api.get('api/projects')
    logger.log('project res', res)
    AppState.projects = res.data.map(p => new Project(p))
  }

  async deleteProject(projectId) {
    const res = await api.delete('api/projects/' + projectId)
    logger.log('delete project res', res)
  }

  async editProject(project) {
    const res = await api.put(`api/projects/${project.id}`, project)
    AppState.project = new Project(res.data)
  }
}

export const projectsService = new ProjectsService()
