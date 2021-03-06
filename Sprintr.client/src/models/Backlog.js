export class Backlog {
  constructor(data) {
    this.name = data.name
    this.description = data.description
    this.status = data.status
    this.projectId = data.projectId
    this.sprintId = data.sprintId
    this.creatorId = data.creatorId || ''
    this.color = data.color
    this.id = data.id
    this.taskId = data.taskId
    this.creator = data.creator
    this.totalWeight = data.totalWeight
  }
}
