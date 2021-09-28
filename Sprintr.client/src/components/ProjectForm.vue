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
import { reactive, ref } from '@vue/reactivity'
import { projectsService } from '../services/ProjectsService.js'
import { Project } from '../models/Project.js'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState.js'
import { computed, watchEffect } from '@vue/runtime-core'

export default {
  props: {
    project: {
      type: Object,
      default: () => new Project()
    }
  },
  setup(props) {
    const editable = ref({})
    const router = useRouter()
    const state = reactive({
      currentProject: computed(() => AppState.currentProject)
    })
    watchEffect(() => {
      editable.value = { ...props.project }
    })
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
      },
      async toProject() {
        try {
          await projectsService.getProjectById(props.project.id)
          router.push({ name: 'Project', params: { projectId: state.currentProject.id } })
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
