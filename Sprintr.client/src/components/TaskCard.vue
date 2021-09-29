<template>
  <div class="card">
    <h5 class="card-header">
      Test
    </h5>
    <div class="card-body">
      <h5 class="card-title">
        test
      </h5>
      <p class="card-text">
        Test
      </p>
      <a href="#" class="btn btn-primary">Button</a>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
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
      backlog: computed(() => AppState.backlog),
      backlogs: computed(() => AppState.backlogs),
      project: computed(() => AppState.project),
      projects: computed(() => AppState.projects),
      async removeBacklog() {
        try {
          const yes = await Pop.confirm('Are you positive?')
          if (!yes) { return }
          logger.log('This is on the backlog Card', props.task.id)
          // NOTE Supplay all arguments!! and all id's!!! vvv              vvvv
          await tasksService.removeTask(route.params.projectId, props.task.id)
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
