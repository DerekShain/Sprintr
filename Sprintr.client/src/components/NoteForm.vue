<template>
  <form @submit.prevent="createNote()">
    <div class="form-group">
      <label class="pr-2" for="note-body">Note body</label>
      <input type="text"
             class="form-control"
             maxlength="50"
             placeholder="Note Body..."
             v-model="editable.body"
             required
      >
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-3">
        Create Note
      </button>
    </div>
  </form>
</template>

<script>
import { Modal } from 'bootstrap'
import Pop from '../utils/Pop.js'
import { ref } from '@vue/reactivity'
import { notesService } from '../services/NotesService.js'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger.js'

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
      editable,
      route,
      async createNote() {
        try {
          if (editable.value.id) {
            await notesService.editNote()
          } else {
            editable.value.backlogItemId = props.backlog.id
            await notesService.createNote(route.params.projectId, props.backlog.id, editable.value)
          }
          editable.value = {}
          Pop.toast('Noice!', 'success')
          const modal = Modal.getInstance(document.getElementById('note-form-' + props.backlog.id))
          modal.hide()
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
