<template>
  <div class="card">
    <h5 class="card-header">
      {{ task.name }}
      <i class="mdi mdi-delete-sweep text-secondary selectable ps-3 f-18" aria-hidden="true" title="Delete Task" @click="removeTask()"></i><br />
    </h5>
    <div class="card-body">
      <h5 class="card-title">
        {{ task.weight }}
      </h5>
      <p class="card-text">
        {{ task.isComplete }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { tasksService } from '../services/TasksService'
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    onMounted(async() => {
      try {
        // await tasksService.getTasks(route.params.backlogId)
      } catch (error) {
        Pop.toast('Error grabbing tasks', error)
      }
    })
    return {
      route,
      account: computed(() => AppState.account),
      tasks: computed(() => AppState.tasks),
      backlog: computed(() => AppState.backlog),
      backlogs: computed(() => AppState.backlogs),
      project: computed(() => AppState.project),
      projects: computed(() => AppState.projects),
      async removeTask() {
        try {
          const yes = await Pop.confirm('Are you positive?')
          if (!yes) { return }
          logger.log('This is on the backlog Card', props.task.id)
          // NOTE Supplay all arguments!! and all id's!!! vvv              vvvv
          await tasksService.removeTask(route.params.projectId, props.task.id, route.params.backlogItemId)
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
