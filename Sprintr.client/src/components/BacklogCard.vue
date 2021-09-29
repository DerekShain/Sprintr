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
        <button class="btn btn-ponk text-dark hoverable mx-2" @click="removeBacklog()" title="Delete Backlog Item">
          <i class="fa fa-trash text-dark"></i>
          Delete
        </button>
        <!-- <button class="btn btn-info text-white mx-2" data-toggle="modal" :data-target="'#create-task' + backlog.id" title="Create New Task">
          + Add Task
        </button> -->Add
      </div>
    </div>
    <!-- <TasksThread :tasks="tasks" /> -->Task
    <!-- <CreateTaskModal :backlog-item="backlogItem" /> -->Create
  </div>
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
