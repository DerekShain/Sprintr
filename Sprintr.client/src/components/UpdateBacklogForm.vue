<template>
  <form @submit.prevent="editBacklog()">
    <div class="form-group">
      <label class="pr-2" for="backlog-status">Status</label>
      <select name="status" id="status" required class="form-control" v-model="editable.status">
        <option disabled selected value="">
          Please Choose your Status
        </option>
        <option>pending</option>
        <option>in-progress</option>
        <option>review</option>
        <option>done</option>
      </select>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-3">
        Create Backlog
      </button>
    </div>
  </form>
</template>

<script>

import Pop from '../utils/Pop.js'
import { ref } from '@vue/reactivity'
import { backlogsService } from '../services/BacklogsService.js'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger.js'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { Backlog } from '../models/Backlog.js'

export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      route,
      currentBacklog: computed(() => AppState.currentBacklog),
      backlogs: computed(() => AppState.backlogs),
      // backlog: computed(() => AppState.backlog),
      async editBacklog() {
        try {
          logger.log('the backlog??')
          await backlogsService.editBacklog(route.params.projectId, AppState.currentBacklog.id, editable.value)
          logger.log('the backlog??', AppState.currentBacklog.id)
        } catch (error) {
          // Pop.error('Edit Backlog Error', error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
