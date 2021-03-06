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
          <button :id="'note-navbutton-'+backlog.id"
                  class="btn btn-dark text-light"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#collapseExample-'+backlog.id"
                  aria-expanded="false"
                  aria-controls="collapseExample"
          >
            Notes
          </button>
        </li>
        <li class="nav-item mx-1">
          <button :id="'sprint-navbutton-'+backlog.id"
                  class="btn btn-dark text-light"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#collapseExample3-'+backlog.id"
                  aria-expanded="false"
                  aria-controls="collapseExample3"
          >
            Sprints
          </button>
        </li>
        <li class="nav-item justify-content-end mx-1">
          <button class="btn btn-dark text-light" disabled>
            Total Weight: {{ totalWeight }}
          </button>
        </li>
        <li class="nav-item justify-content-end mx-1">
          <div v-if="account.id == backlog.creatorId">
            <select class="selectable" name="backlogs" id="backlogs" @change="editStatus(editable)" v-model="editable">
              <option class="selectable">
                Update Status
              </option>
              <option class="selectable">
                pending
              </option>
              <option class="selectable">
                in-progress
              </option>
              <option class="selectable">
                review
              </option>
              <option class="selectable">
                done
              </option>
            </select>
          </div>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <h3 class="card-title">
        {{ backlog.name }}
        <i v-if="account.id == backlog.creatorId" class="mdi mdi-delete-sweep text-secondary selectable ps-3 f-18" aria-hidden="true" title="Delete Backlog" @click="removeBacklog()"></i><br />
      </h3>

      <h4 class="card-text">
        Status: <span class="text-dark">{{ backlog.status }}</span>
      </h4>

      <!-- NOTE These are the dropdowns -->
      <div class="Info p-2">
        <div class="collapse" :id="'collapseExample-'+backlog.id">
          <div class="card card-body">
            <i class="mdi mdi-message-bulleted text-secondary selectable f-18" data-bs-toggle="modal" :data-bs-target="'#note-form-'+backlog.id" title="Create New Note" type="submit"> Add a Note</i><br />
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
        <div class="collapse" :id="'collapseExample3-'+backlog.id">
          <div class="card card-body">
            <!-- <i class="mdi mdi-message-bulleted text-secondary selectable f-18" data-bs-toggle="modal" :data-bs-target="'#sprintselect-'+backlog.id" title="Select a Sprint" type="submit">Select a Sprint</i><br /> -->
            <div class="form-group">
              <select name="sprintselect"
                      id="sprintselect"
                      required
                      class="form-control"
              >
                <option v-for="s in sprints"
                        :key="s.name"
                >
                  {{ s.name }}
                </option>
              </select>
              <i v-if="account.id == backlog.creatorId" class="mdi mdi-circle-edit-outline text-secondary selectable ps-3 f-18" aria-hidden="true" title="Edit Backlog" @submit.prevent="editBacklog()"></i><br />
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
import { computed, ref } from '@vue/runtime-core'
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
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({})
    return {
      route,
      sprints: computed(() => AppState.sprints),
      account: computed(() => AppState.account),
      // NOTE vvvvvvvv FILTERING!!!
      tasks: computed(() => AppState.tasks.filter(task => task.backlogId === props.backlog.id)),
      task: computed(() => AppState.task),
      notes: computed(() => AppState.notes.filter(note => note.backlogId === props.backlog.id)),
      note: computed(() => AppState.note),
      backlogs: computed(() => AppState.backlogs),
      project: computed(() => AppState.project),
      projects: computed(() => AppState.projects),
      totalWeight: computed(() => {
        let weight = 0
        const tasks = AppState.tasks.filter(t => t.backlogId === props.backlog.id)
        for (let i = 0; i < tasks.length; i++) {
          weight += tasks[i].weight
        }
        return weight
      }),
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
      async editStatus(status) {
        try {
          // debugger
          await backlogsService.editBacklog(route.params.projectId, props.backlog.id, status)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async tryEdit() {
        try {
          if (editable.value.id) {
            await backlogsService.editBacklog()
          } else {
            editable.value.backlogItemId = props.backlog.id
            await backlogsService.editBacklog(route.params.projectId, props.backlog.id, editable.value)
          }
          editable.value = {}
          Pop.toast('Noice!', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
          logger.log('this is the create note error', error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
