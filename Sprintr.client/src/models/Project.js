
export class Project {
  constructor(data) {
    this.name = data.name
    this.description = data.description
    this.creatorId = data.creatorId || ''
    this.id = data.projectId
  }
}
