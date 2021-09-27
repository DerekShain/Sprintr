import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const NoteSchema = new Schema(
  {
    body: {
      type: String,
      required: true
    },
    backlogItemId: {
      type: Schema.Types.ObjectId,
      ref: 'Backlog',
      required: true
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    // NOTE this is a relationship more here later
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true
    }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

NoteSchema.virtual('backlog', {
  localField: 'backlogItemId',
  foreignField: '_id',
  ref: 'Backlog',
  justOne: true
})
NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
NoteSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  ref: 'Project',
  justOne: true
})
