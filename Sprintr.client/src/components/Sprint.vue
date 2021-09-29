<template>
  <div class="card">
    <div class="card-header">
    </div>
    <div class="card-body">
      <h5 class="card-title">
      </h5>
      <p class="card-text">
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { Sprint } from '../models/Sprint.js'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { router } from '../router.js'
import { sprintsService } from '../services/SprintsService.js'
export default {
  props: {
    sprint: {
      type: Sprint,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      sprints: computed(() => AppState.sprints),
      async removeSprint() {
        try {
          const yes = await Pop.confrim('Are you sure you want to delete?')
          if (!yes) { return }
          await sprintsService.deleteSprint(props.sprint.id)
          Pop.toast('Sprint has been deleted!', 'success')
          router.push({ name: 'Project' })
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
