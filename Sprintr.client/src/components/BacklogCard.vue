<template>
  <div class="col-11 py-5 my-3 ">
    <div class="row bg-light">
      <div class="col-6">
        <h1>Backlog Item: {{ backlog.name }}</h1>
        <h2>
          <i class="fas fa-weight-hanging text-dark"></i>
          <!-- Total Backlog Weight: {{ totalWeight }} -->Total Weight
          <div class="mt-1">
            <!-- {{ completed.length }} / {{ tasks.length }} Tasks Completed -->
          </div>
        </h2>
      </div>
      <div class="col-6 mt-3">
        <button class="btn btn-dark text-light hoverable mx-2" @click="removeBacklog()" title="Delete Backlog Item">
          <i class="fa fa-trash text-dark"></i>
          Delete
        </button>
        <button class="btn btn-dark text-light mx-2" data-bs-toggle="modal" data-bs-target="#task-form" title="Create New Task" type="submit">
          Add Task
        </button>
        <!-- NOTE Buttons to expand menus -->
        <div class="Info p-2">
          <p>
            <a class="btn btn-primary"
               data-bs-toggle="collapse"
               href="#collapseExample"
               role="button"
               aria-expanded="false"
               aria-controls="collapseExample"
            >
              Notes
            </a>
            <button class="btn btn-primary"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample2"
                    aria-expanded="false"
                    aria-controls="collapseExample2"
                    :backlog="backlog"
            >
              Tasks
            </button>
          </p>
          <div class="collapse" id="collapseExample">
            <div class="card card-body">
              test
            </div>
          </div>
          <div class="collapse" id="collapseExample2">
            <div class="card card-body">
              test2
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TaskModal>
    <template #modal-title>
      <h4>Task Form</h4>
    </template>
    <template #modal-body>
      <TaskForm :backlog="backlog" />
    </template>
  </TaskModal>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { backlogsService } from '../services/BacklogsService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
// import { tasksService } from '../services/TasksService'
export default {
  props: {
    backlog: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    // onMounted(async() => {
    //   try {
    //     await tasksService.getBacklogTask(props.backlog.id)
    //   } catch (error) {
    //     Pop.toast(error, 'error')
    //   }
    // })
    return {
      route,
      account: computed(() => AppState.account),
      tasks: computed(() => AppState.tasks[props.backlog.id] || []),
      // backlog: computed(() => AppState.backlog),
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
