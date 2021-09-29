<template>
  <div class="card text-center">
    <div class="card-body">
      <h5 class="card-title">
        {{ project.name }}
      </h5>
      <p class="card-text">
        {{ project.description }}
      </p>
      <router-view />
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState.js'
import { Project } from '../models/Project.js'
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
