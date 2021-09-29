<template>
  <form @submit.prevent="createSprint()">
    <div class="form-group">
      <label class="pr-2" for="sprint-name">Sprint Name</label>
      <input type="text"
             class="form-control"
             maxlength="50"
             placeholder="Sprint Name..."
             v-model="editable.name"
             required
      >
    </div>
    <div class="form-group">
      <label class="pr-2" for="sprint-startDate">Start Date</label>
      <input type="date"
             class="form-control"
             placeholder="Start Date..."
             v-model="editable.startDate"
             required
      >
    </div>
    <div class="form-group">
      <label class="pr-2" for="sprint-endDate">End Date</label>
      <input type="date"
             class="form-control"
             placeholder="Start Date..."
             v-model="editable.endDate"
             required
      >
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-3">
        Create Sprint
      </button>
    </div>
  </form>
</template>

<script>
import { Modal } from 'bootstrap'
import Pop from '../utils/Pop.js'
import { ref } from '@vue/reactivity'
import { sprintsService } from '../services/SprintsService.js'
import { router } from '../router.js'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      route,
      async createSprint() {
        try {
          if (editable.value.id) {
            await sprintsService.editSprint(editable.value)
          } else {
            await sprintsService.createSprint(route.params.projectId, editable.value)
            // router.push({ name: 'Sprint', params: { sprintId: id } })
          }
          editable.value = {}
          Pop.toast('Noice!', 'success')
          const modal = Modal.getInstance(document.getElementById('sprint-form'))
          modal.hide()
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
