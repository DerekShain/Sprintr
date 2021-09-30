<template>
  <div class="card" style="width:500px">
    <div class="card-body">
      <h2>  {{ project.name }}</h2>
      <router-link :to="{name: 'Project', params: {projectId: project.id}}" class="selectable">
        Take me to project
      </router-link>
      <div class="col-2" v-if="project.creator">
        <img :src="project.creator.picture" height="45">
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { Project } from '../models/Project'
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
      projects: computed(() => AppState.projects)

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
