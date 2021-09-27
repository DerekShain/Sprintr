import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BacklogItemSchema } from '../models/BacklogItem'
import { NoteSchema } from '../models/Note'
import { TaskSchema } from '../models/Task'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  BacklogItem = mongoose.model('Backlog', BacklogItemSchema);
  Note = mongoose.model('Note', NoteSchema);
  Task = mongoose.model('Task', TaskSchema);
}

export const dbContext = new DbContext()
