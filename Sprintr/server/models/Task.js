import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TaskSchema = new Schema(
  {
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    backlogItemId: { type: Schema.Types.ObjectId, ref: 'Backlog', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    completedOn: { type: Date, required: false }
    // assignedTo: [{ type: Schema.Types.ObjectId, ref: 'Profile' }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TaskSchema.virtual('backlog', {
  localField: 'backlogItemId',
  foreignField: '_id',
  ref: 'Backlog',
  justOne: true
})
TaskSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
TaskSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  ref: 'Project',
  justOne: true
})
// TaskSchema.virtual('assigned', {
//   localField: 'creatorId',
//   foreignField: '_id',
//   ref: 'Profile',
//   justOne: true
// })
