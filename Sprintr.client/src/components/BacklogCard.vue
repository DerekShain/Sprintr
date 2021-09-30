<template>
  <div class="card  m-2" style="width: 75vw">
    <div class="card-header">
      <ul class="nav nav-pills card-header-pills">
        <div class=" mx-1" v-if="project.creator">
          <img :src="backlog.creator.picture" class="rounded-circle" height="45" alt="">
        </div>
        <li class="nav-item mx-1">
          <button :id="'task-navbutton-'+backlog.id"
                  class="btn btn-dark text-light"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#collapseExample2-'+backlog.id"
                  aria-expanded="false"
                  aria-controls="collapseExample2"
          >
            Task
          </button>
        </li>
        <li class="nav-item mx-1">
          <button class="btn btn-dark text-light"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
          >
            Notes
          </button>
        </li>
        <li class="nav-item justify-content-end mx-1">
          <button class="btn btn-dark text-light" disabled>
            Total Weight: {{ totalWeight }}
          </button>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        {{ backlog.name }}
        <i v-if="account.id == backlog.creatorId" class="mdi mdi-delete-sweep text-secondary selectable ps-3 f-18" aria-hidden="true" title="Delete Backlog" @click="removeBacklog()"></i><br />
      </h5>
      <p class="card-text">
        {{ backlog.status }}
      </p>
      <!-- <TaskCard v-for="t in tasks" :key="t.id" :task="t" />
      <NoteCard v-for="n in notes" :key="n.id" :note="n" /> -->
      <!-- NOTE These are the dropdowns -->
      <div class="Info p-2">
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            <i class="mdi mdi-message-bulleted text-secondary selectable f-18" data-bs-toggle="modal" :data-bs-target="'#note-form-'+ backlog.id" title="Create New Note" type="submit"> Add a Note</i><br />
          </div>
          <div class="note-list">
            <NoteCard v-for="n in notes" :key="n.id" :note="n" />
          </div>
        </div>
        <div class="collapse" :id="'collapseExample2-'+backlog.id">
          <div class="card card-body">
            <i class="mdi mdi-plus-box text-secondary selectable f-18" data-bs-toggle="modal" :data-bs-target="'#task-form-'+backlog.id" title="Create New Task" type="submit"> Add New Task</i><br />
            <div class="task-list">
              <TaskCard v-for="t in tasks" :key="t.id" :task="t" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TaskModal :id="'task-form-'+backlog.id">
    <template #modal-title>
      <h4>Task Form</h4>
    </template>
    <template #modal-body>
      <TaskForm :backlog="backlog" />
    </template>
  </TaskModal>
  <NoteModal :id="'note-form-'+backlog.id">
    <template #modal-title>
      <h4>Note Form</h4>
    </template>
    <template #modal-body>
      <NoteForm :backlog="backlog" />
    </template>
  </NoteModal>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { backlogsService } from '../services/BacklogsService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
export default {
  props: {
    backlog: {
      type: Object,
      required: true
    }
    // task: {
    //   type: Object,
    //   required: true
    // }
  },
  setup(props) {
    const route = useRoute()
    onMounted(async(taskId) => {
      try {
        // await tasksService.getTaskById(route.params.backlogId)
        // AppState.task = AppState.task.filter(t => t.id !== taskId)
      } catch (error) {
        Pop.toast('Error grabbing tasks', error)
      }
    })
    return {
      route,
      account: computed(() => AppState.account),
      // NOTE vvvvvvvv FILTERING!!!
      tasks: computed(() => AppState.tasks.filter(task => task.backlogId === props.backlog.id)),
      task: computed(() => AppState.task),
      notes: computed(() => AppState.notes.filter(note => note.backlogId === props.backlog.id)),
      note: computed(() => AppState.note),
      backlogs: computed(() => AppState.backlogs),
      project: computed(() => AppState.project),
      projects: computed(() => AppState.projects),
      async removeBacklog() {
        try {
          const yes = await Pop.confirm('Are you positive?')
          if (!yes) { return }
          logger.log('This is on the backlog Card', props.backlog.id)
          // NOTE Supplay all arguments!! and all id's!!! vvv              vvvv
          await backlogsService.removeBacklog(route.params.projectId, props.backlog.id)
          Pop.toast('Deleted', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      totalWeight: computed(() => {
        let weight = 0
        // let tasks = []
        // for (let i = 0; i < AppState.backlogs.length; i++) {
        const tasks = AppState.tasks.filter(t => t.backlogId === props.backlog.id)
        for (let i = 0; i < tasks.length; i++) {
          weight += tasks[i].weight
        }
        return weight
        // }
        // AppState.backlogs.totalWeight = weight
        // logger.log('total Weight', AppState.backlogs)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
