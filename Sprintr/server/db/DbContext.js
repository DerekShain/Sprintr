import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ProjectSchema } from '../models/Project.js'
import { SprintSchema } from '../models/Sprint.js'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Projects = mongoose.model('Project', ProjectSchema);
  Sprints = mongoose.model('Sprint', SprintSchema);
}

export const dbContext = new DbContext()
