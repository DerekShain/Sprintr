
export class Project {
  constructor(data) {
    this.name = data.name
    this.description = data.description
    this.creatorId = data.creatorId || ''
    this.id = data.id || ''
    this.creator = data.creator
  }
}
