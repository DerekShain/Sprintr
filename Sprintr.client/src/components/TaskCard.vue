<template>
  <div class="card">
    <div class="header">
      <h5 class="card-header" v-if="task.isComplete === false" style="background: red">
        {{ task.name }} needs to be worked on.
        <i class="mdi mdi-delete-sweep text-secondary selectable ps-3 f-18" v-if="account.id == task.creatorId" aria-hidden="true" title="Delete Task" @click="removeTask()"></i><br />
      </h5>
    </div>
    <div class="header" v-if="task.isComplete === true" style="background: green">
      <h5 class="card-header">
        {{ task.name }} has been completed!!
        <i class="mdi mdi-delete-sweep text-secondary selectable ps-3 f-18" v-if="account.id == task.creatorId" aria-hidden="true" title="Delete Task" @click="removeTask()"></i><br />
      </h5>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        {{ task.weight }}
      </h5>
      <button class="btn btn-dark text-light" @click="completeTask()">
        Have you completed the task?
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
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
    const editable = ref({})
    onMounted(async() => {
      try {
        // await tasksService.getTasks(route.params.backlogId)
      } catch (error) {
        Pop.toast('Error grabbing tasks', error)
      }
    })
    return {
      route,
      editable,
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
      },
      async completeTask() {
        try {
          // NOTE Supplay all arguments!! and all id's!!! vvv              vvvv
          await tasksService.toggleComplete(route.params.projectId, props.task.id, route.params.backlogItemId)
        } catch (error) {
          Pop.toast(error, 'error')
          logger.error(error)
        }
      }
    }
  }
}
// dig in to object.. grab task, edit, then ship
</script>

<style lang="scss" scoped>

</style>
