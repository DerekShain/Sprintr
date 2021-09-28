export class Backlog {
  constructor(data) {
    this.name = data.body
    this.description = data.description
    this.status = data.status
    this.projectId = data.projectId
    this.sprintId = data.sprintId
    this.creatorId = data.creatorId
    this.color = data.color
  }
}
