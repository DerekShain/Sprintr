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
import { router } from '../router.js'

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createBacklog() {
        try {
          if (editable.value.id) {
            await backlogsService.editBacklog(editable.value)
          } else {
            const id = await backlogsService.createBacklog(editable.value)
            router.push({ name: 'Backlog', params: { backlogId: id } })
          }
          editable.value = {}
          Pop.toast('Noice!', 'success')
          const modal = Modal.getInstance(document.getElementById('backlog-form'))
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
