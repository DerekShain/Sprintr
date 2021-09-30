import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  creator: '',
  projects: [],
  project: [],
  currentProject: {},
  backlogs: [],
  backlog: [],
  sprints: [],
  sprint: [],
  tasks: {},
  task: '',
  notes: [],
  note: ''
})
