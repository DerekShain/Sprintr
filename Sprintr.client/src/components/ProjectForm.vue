<template>
  <form @submit.prevent="createProject()">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text"
             class="form-control bg-light"
             name="name"
             placeholder="Name"
             v-model="editable.name"
             required
      >
    </div>
    <div class="form-group">
      <label for="title">Description</label>
      <input type="text"
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
import { router } from '../router.js'

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createProject() {
        try {
          if (editable.value.id) {
            await projectsService.editProject(editable.value)
          } else {
            const id = await projectsService.createProject(editable.value)
            router.push({ name: 'Project', params: { projectId: id } })
          }
          editable.value = {}
          Pop.toast('Noice!', 'success')
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
