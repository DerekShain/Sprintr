export class Note {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.creatorId = data.creatorId || ''
    this.backlogItemId = data.backlogItemId
    this.projectId = data.projectId
  }
}
