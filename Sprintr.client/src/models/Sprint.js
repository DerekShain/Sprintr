export class Sprint {
  constructor(data) {
    this.name = data.name
    this.startDate = data.startDate
    this.endDate = data.endDate
    this.projectId = data.projectId
    this.creatorId = data.creatorId || ''
    this.id = data.id
  }
}
