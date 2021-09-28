<template>
  <div class="row">
    <div class="card">
      <router-link :to="{name: 'Project' }" class="btn text-success lighten-30 selectable text-uppercase">
        Project
      </router-link>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState.js'
import { projectsService } from '../services/ProjectsService.js'
import { Project } from '../models/Project.js'
import Pop from '../utils/Pop.js'
import { computed } from '@vue/runtime-core'

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
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
