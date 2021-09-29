<template>
  <div class="d-flex flex-column align-items-center p-4">
    <div class="card p-5 bg-white rounded elevation-3 ">
      <div class="d-grid gap-2 d-md-flex justify-content-md-end ">
        <Project :project="project" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { projectsService } from '../services/ProjectsService'
export default {
  setup() {
    const route = useRoute()
    onMounted(() =>
      projectsService.getProjectById(route.params.projectId)
    )
    return {
      account: computed(() => AppState.account),
      // projects: computed(() => AppState.projects),
      project: computed(() => AppState.project)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
