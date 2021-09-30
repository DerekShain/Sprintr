export class Task {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.weight = data.weight
    this.projectId = data.projectId
    this.backlogId = data.backlogItemId
    this.creatorId = data.creatorId || ''
    this.isComplete = data.isComplete
    this.completeOn = data.completeOn
  }
}
