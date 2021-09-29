<template>
  <div class="card">
    <div class="card-header">
      Project Name, Weight
    </div>
    <div class="card-body">
      <h5 class="card-title">
        0 out of tasks 0 completed
      </h5>
      <p class="card-text">
        Dates
      </p>
      <a href="#" class="btn btn-primary">See Details</a><a href="#" class="btn btn-primary">Add Task</a>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { Backlog } from '../models/Backlog.js'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { router } from '../router.js'
import { backlogsService } from '../services/BacklogsService.js'
export default {
  props: {
    backlog: {
      type: Backlog,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      backlogs: computed(() => AppState.backlogs),
      async removeBacklog() {
        try {
          const yes = await Pop.confrim('Are you sure you want to delete?')
          if (!yes) { return }
          await backlogsService.deleteBacklog(props.backlog.id)
          Pop.toast('Backlog has been deleted!', 'success')
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
