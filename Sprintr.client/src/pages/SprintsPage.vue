<template>
  <div class="sprints">
    <h1> The sprints test page!</h1>
    <button class="btn btn-primary " type="submit" data-bs-toggle="modal" data-bs-target="#sprint-form">
      Add Sprint
    </button>
    <div class="sprintList">
      <SprintCard v-for="s in sprints" :key="s.id" :sprint="s" />
    </div>
  </div>
  <SprintModal>
    <template #modal-title>
      <h4>Sprint Form</h4>
    </template>
    <template #modal-body>
      <SprintForm />
    </template>
  </SprintModal>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { sprintsService } from '../services/SprintsService.js'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await sprintsService.getSprints(route.params.projectId)
      } catch (error) {
        Pop.toast('error one the sprint page', error)
      }
    })
    return {
      sprints: computed(() => AppState.sprints),
      sprint: computed(() => AppState.sprint),
      project: computed(() => AppState.project),
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
