import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BacklogItemSchema } from '../models/BacklogItem'
import { NoteSchema } from '../models/Note'
import { ProjectSchema } from '../models/Project.js'
import { SprintSchema } from '../models/Sprint.js'
import { TaskSchema } from '../models/Task'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  BacklogItems = mongoose.model('Backlog', BacklogItemSchema);
  Notes = mongoose.model('Note', NoteSchema);
  Tasks = mongoose.model('Task', TaskSchema);
  Projects = mongoose.model('Project', ProjectSchema);
  Sprints = mongoose.model('Sprint', SprintSchema);
}
export const dbContext = new DbContext()
