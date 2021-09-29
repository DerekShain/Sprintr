<template>
  <div class="col-11 py-5 my-3 ">
    <div class="row bg-light">
      <div class="col-6">
        <h1>Sprint: {{ sprint.name }}</h1>
        <h2>
          <i class="fas fa-weight-hanging text-dark"></i>

          <div class="mt-1">
          </div>
        </h2>
      </div>
      <div class="col-6 mt-3">
        <button class="btn btn-ponk text-dark hoverable mx-2" @click="removeSprint()" title="Sprint">
          <i class="fa fa-trash text-dark"></i>
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { sprintsService } from '../services/SprintsService.js'
import { useRoute } from 'vue-router'

export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      route,
      account: computed(() => AppState.account),
      sprints: computed(() => AppState.sprints),
      backlogs: computed(() => AppState.backlogs),
      project: computed(() => AppState.project),
      projects: computed(() => AppState.projects),
      async removeSprint() {
        try {
          const yes = await Pop.confirm('Are you positive?')
          if (!yes) { return }
          logger.log('This is on the sprint Card', props.sprint.id)
          await sprintsService.removeSprint(route.params.projectId, props.sprint.id)
          Pop.toast('Deleted', 'success')
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
