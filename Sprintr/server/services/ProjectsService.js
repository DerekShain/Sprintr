import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class ProjectsService {
  async getProjectById(projectId) {
    const project = await dbContext.Projects.findById(projectId)
    if (!project) {
      throw new BadRequest('Invalid Project Id')
    }
    return project
  }

  async editProject(projectId, userId, projectData) {
    const project = await this.getProjectById(projectId)
    if (userId !== project.creatorId.toString()) {
      throw new Forbidden('You shall not pass!!!')
    }
    project.name = projectData.name
    project.description = projectData.description || project.description
    project.id = projectData.id
    project._id = projectData._id
    await project.save()
    return project
  }

  async removeProject(projectId, userId) {
    const project = await this.getProjectById(projectId)
    if (userId !== project.creatorId.toString()) {
      throw new Forbidden('go')
    }
    await project.remove()
    return project
  }

  async createProject(projectData) {
    const project = await dbContext.Projects.create(projectData)
    return project
  }

  async getProjects(query) {
    const projects = await dbContext.Projects.find(query)
    return projects
  }
}

export const projectsService = new ProjectsService()
