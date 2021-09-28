<template>
  <form @submit.prevent="createProject()">
    <div class="form-group">
      <label for="body">Name</label>
      <input type="text"
             class="form-control bg-light"
             name="body"
             placeholder="Name"
             v-model="editable.name"
             required
      >
    </div>
    <div class="form-group">
      <label for="title">Description</label>
      <input type="test"
             class="form-control bg-light"
             name="imgUrl"
             placeholder="description"
             v-model="editable.description"
             required
      >
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-3">
        Create Project
      </button>
    </div>
  </form>
</template>

<script>
import { Modal } from 'bootstrap'
import Pop from '../utils/Pop.js'
import { ref } from '@vue/reactivity'
import { projectsService } from '../services/ProjectsService.js'

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createProject() {
        try {
          await projectsService.createProject(editable.value)
          editable.value = {}
          Pop.toast('You made it', 'success')

          const modal = Modal.getInstance(document.getElementById('project-form'))
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
