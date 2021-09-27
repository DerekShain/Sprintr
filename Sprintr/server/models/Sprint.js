import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const SprintSchema = new Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

SprintSchema.virtual('sprint', {
  localField: 'sprintId',
  foreignField: '_id',
  ref: 'Sprint',
  justOne: true
})

SprintSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
