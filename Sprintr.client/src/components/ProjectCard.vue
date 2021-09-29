<template>
  <div class="card m-2">
    <div class="card-body">
      <h2>  {{ project.name }}</h2>
      <router-link :to="{name: 'Project', params: {projectId: project.id}}" class="selectable">
        Take me to project
      </router-link>
      <!-- <img :src="project.creator.picture" height="45"> -->
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects)

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
