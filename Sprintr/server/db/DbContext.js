import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
<<<<<<< HEAD
import { ProjectSchema } from '../models/Project.js'
import { SprintSchema } from '../models/Sprint.js'
=======
import { BacklogItemSchema } from '../models/BacklogItem'
import { NoteSchema } from '../models/Note'
import { TaskSchema } from '../models/Task'
>>>>>>> 68b3e04a66c6df9a9c58930daf67910d48abe4f4
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
<<<<<<< HEAD
  Projects = mongoose.model('Project', ProjectSchema);
  Sprints = mongoose.model('Sprint', SprintSchema);
=======
  BacklogItem = mongoose.model('Backlog', BacklogItemSchema);
  Note = mongoose.model('Note', NoteSchema);
  Task = mongoose.model('Task', TaskSchema)
>>>>>>> 68b3e04a66c6df9a9c58930daf67910d48abe4f4
}

export const dbContext = new DbContext()
