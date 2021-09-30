<template>
  <div class="card">
    <h5 class="card-header">
      Test
    </h5>
    <div class="card-body">
      <h5 class="card-title">
        test
      </h5>
      <p class="card-text">
        Test
      </p>
      <a href="#" class="btn btn-primary">Button</a>
    </div>
  </div>
</template>

<script>

import { logger } from '../utils/Logger'
import { notesService } from '../services/NotesService.js'
import { useRoute } from 'vue-router'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'

export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      route,
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes[props.backlog.id] || []),
      backlog: computed(() => AppState.backlog),
      backlogs: computed(() => AppState.backlogs),
      project: computed(() => AppState.project),
      projects: computed(() => AppState.projects),
      async removeBacklog() {
        try {
          const yes = await Pop.confirm('Are you positive?')
          if (!yes) { return }
          logger.log('This is on the backlog Card', props.note.id)
          await notesService.removeNote(route.params.projectId, props.note.id)
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
