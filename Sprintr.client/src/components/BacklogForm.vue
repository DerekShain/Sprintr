<template>
  <form @submit.prevent="createBacklog()">
    <div class="form-group">
      <label class="pr-2" for="backlog-name">Backlog Item Name</label>
      <input type="text"
             class="form-control"
             maxlength="50"
             placeholder="Backlog Item Name..."
             v-model="editable.name"
             required
      >
    </div>
    <div class="form-group">
      <label class="pr-2" for="backlog-description">Description</label>
      <input type="text"
             class="form-control"
             maxlength="150"
             placeholder="Description..."
             v-model="editable.description"
             required
      >
    </div>
    <div class="form-group">
      <label class="pr-2" for="backlog-status">Status</label>
      <select name="status" id="status" required class="form-control" v-model="editable.status">
        <option disabled selected value="">
          Please Choose your Status
        </option>
        <option>pending</option>
        <option>in-progress</option>
        <option>review</option>
        <option>done</option>
      </select>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-3">
        Create Backlog
      </button>
    </div>
  </form>
</template>

<script>
import { Modal } from 'bootstrap'
import Pop from '../utils/Pop.js'
import { ref } from '@vue/reactivity'
import { backlogsService } from '../services/BacklogsService.js'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger.js'
import { computed, onMounted } from '@vue/runtime-core'
import { sprintsService } from '../services/SprintsService.js'
import { AppState } from '../AppState.js'

export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await sprintsService.getSprints(route.params.projectId)
      } catch (error) {
        Pop.toast('errror with the backlogform', error)
      }
    })
    const editable = ref({})
    return {
      editable,
      route,
      async createBacklog() {
        try {
          if (editable.value.id) {
            await backlogsService.editBacklog(editable.value)
          } else {
            // debugger
            await backlogsService.createBacklog(route.params.projectId, editable.value)
            // router.push({ name: 'Backlog', params: { backlogId: id } })
          }
          editable.value = {}
          Pop.toast('Noice!', 'success')
          const modal = Modal.getInstance(document.getElementById('backlog-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error, 'error')
          logger.log('this is the create backlog error', error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
