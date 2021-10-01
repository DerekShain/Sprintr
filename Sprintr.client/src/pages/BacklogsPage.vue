<template>
  <div class="backlogs">
    <h1 class="text-center">
      {{ project.name }} Backlogs
    </h1>
    <button class="btn btn-dark text-light" type="submit" data-bs-toggle="modal" data-bs-target="#backlog-form">
      Add Backlog item
    </button>
    <div class="backlogList">
      <BacklogCard v-for="b in backlogs" :key="b.id" :backlog="b" />
    </div>
  </div>
  <BacklogModal>
    <template #modal-title>
      <h4>Backlog Form</h4>
    </template>
    <template #modal-body>
      <BacklogForm />
    </template>
  </BacklogModal>
  <UpdateBacklogModal :id="'backlog-form-'+backlog.id">
    <template #modal-title>
      <h4>Backlog Form</h4>
    </template>
    <template #modal-body>
      <UpdateBacklogForm />
    </template>
  </UpdateBacklogModal>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { backlogsService } from '../services/BacklogsService'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await backlogsService.getBacklogs(route.params.projectId)
      } catch (error) {
        Pop.toast('error on the backlog page', error)
      }
    })
    return {
      backlogs: computed(() => AppState.backlogs),
      backlog: computed(() => AppState.backlog),
      project: computed(() => AppState.project),
      projects: computed(() => AppState.projects),
      task: computed(() => AppState.tasks)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
