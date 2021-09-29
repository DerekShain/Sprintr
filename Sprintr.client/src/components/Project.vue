<template>
  <div class=" text-center">
    <div class="card-body" style="width: 50vw">
      <h5 class="card-title">
        {{ project.name }}
      </h5>
      <p class="card-text">
        {{ project.description }}
      </p>
      Created on
      {{ new Date(project.createdAt).toLocaleString() }}
      <i class="mdi mdi-delete-sweep text-secondary ps-3 f-18" aria-hidden="true" title="Delete Project" @click="removeProject"></i>
      <router-view />
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState.js'
import { Project } from '../models/Project.js'
import { computed } from '@vue/runtime-core'
import Pop from '../utils/Pop.js'
import { projectsService } from '../services/ProjectsService.js'
import { router } from '../router.js'

export default {
  props: {
    project: {
      type: Project,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      projects: computed(() => AppState.projects),
      async removeProject() {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete?')
          if (!yes) { return }
          await projectsService.deleteProject(props.project.id)
          Pop.toast('Project has been deleted!', 'success')
          router.push({ name: 'Home' })
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
