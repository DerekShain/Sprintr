import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BacklogItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true
      // minlength: 3,
    },
    description: {
      type: String,
      required: [true, 'description?']
    },
    status: {
      type: String,
      default: 0,
      enum: [
        'pending',
        'in-progress',
        'review',
        'done'
      ],
      required: true
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    sprintId: {
      type: Schema.Types.ObjectId,
      ref: 'Sprint',
      required: true
    },
    // NOTE this is a relationship more here later
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true
    },
    color: {
      type: String,
      required: false
    }
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
