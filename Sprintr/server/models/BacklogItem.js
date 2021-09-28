import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BacklogItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 0, enum: ['pending', 'in-progress', 'review', 'done'], required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    sprintId: { type: Schema.Types.ObjectId, ref: 'Sprint' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    color: { type: String, required: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

BacklogItemSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

BacklogItemSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  ref: 'Project',
  justOne: true
})

BacklogItemSchema.virtual('sprint', {
  localField: 'sprintId',
  foreignField: '_id',
  ref: 'Sprint',
  justOne: true
})

BacklogItemSchema.virtual('backlog', {
  localField: 'backlogItemId',
  foreignField: '_id',
  ref: 'Backlog',
  justOne: true
})
