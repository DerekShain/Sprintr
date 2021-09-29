<template>
  <div class="row">
    <div class="card">
      {{ project.name }}
      <p>{{ project.description }}</p>
      <router-link :to="{name:'Project.Backlog'}" class="text-dark lighten-30">
        Backlogs
      </router-link>
    </div>
    <router-view />
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
