<template>
  <!-- <div class=" text-center">
    <div class="card-body" style="width: 50vw">
      <h5 class="card-title">
        {{ project.name }}
      </h5>
      <p class="card-text">
        {{ project.description }}
      </p>
      <small> Created on {{ new Date(project.createdAt).toLocaleDateString() }} at {{ new Date(project.createdAt).toLocaleTimeString() }}</small>
      <i v-if="account.id == project.creatorId" class="mdi mdi-delete-sweep text-secondary ps-3 f-18" aria-hidden="true" title="Delete Project" @click="removeProject"></i>
      <router-view />
    </div>
  </div> -->

  <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="../assets/img/next.png" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            {{ project.name }}
          </h5>
          <p class="card-text">
            {{ project.description }}
          </p>
          <p class="card-text">
            <small class="text-muted">Created on {{ new Date(project.createdAt).toLocaleDateString() }} at {{ new Date(project.createdAt).toLocaleTimeString() }}</small>
            <i v-if="account.id == project.creatorId" class="mdi mdi-delete-sweep text-secondary ps-3 f-18" aria-hidden="true" title="Delete Project" @click="removeProject"></i>
          </p>
        </div>
      </div>
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
