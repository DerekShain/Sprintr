<template>
  <form @submit.prevent="createTask()">
    <div class="form-group">
      <label class="pr-2" for="task-name">Task Name</label>
      <input type="text"
             class="form-control"
             maxlength="50"
             placeholder="Task Item Name..."
             v-model="editable.name"
             required
      >
    </div>
    <div class="form-group">
      <label class="pr-2" for="task-description">Weight</label>
      <input type="number"
             class="form-control"
             maxlength="150"
             placeholder="Weight"
             v-model="editable.description"
             required
      >
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-3">
        Create Task
      </button>
    </div>
  </form>
</template>

<script>
import { Modal } from 'bootstrap'
import Pop from '../utils/Pop.js'
import { ref } from '@vue/reactivity'
import { tasksService } from '../services/TasksService.js'
import { router } from '../router.js'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger.js'

export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      route,
      async createTask() {
        try {
          if (editable.value.id) {
            await tasksService.editTask(editable.value)
          } else {
            await tasksService.createTask(route.params.projectId, editable.value)
            // router.push({ name: 'Task', params: { taskId: id } })
          }
          editable.value = {}
          Pop.toast('Noice!', 'success')
          const modal = Modal.getInstance(document.getElementById('task-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error, 'error')
          logger.log('this is the create task error', error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
