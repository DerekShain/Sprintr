export class Note {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.creatorId = data.creatorId || ''
    this.backlogId = data.backlogItemId
    this.projectId = data.projectId
    this.creator = data.creator
  }
}
