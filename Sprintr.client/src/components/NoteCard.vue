<template>
  <div class="card">
    <h5 class="card-header">
      <img :src="note.creator.picture" class="rounded-circle" height="45" alt="">
      {{ note.creator.name }}
      <i class="mdi mdi-delete-sweep text-secondary selectable ps-3 f-18" v-if="account.id == note.creatorId" aria-hidden="true" title="Delete Note" @click="removeNote()"></i><br />
    </h5>
    <div class="card-body">
      <h5 class="card-title">
        {{ note.body }}
      </h5>
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
      notes: computed(() => AppState.notes),
      backlog: computed(() => AppState.backlog),
      backlogs: computed(() => AppState.backlogs),
      project: computed(() => AppState.project),
      projects: computed(() => AppState.projects),
      async removeNote() {
        try {
          const yes = await Pop.confirm('Are you positive?')
          if (!yes) { return }
          logger.log('This is on the backlog Card', props.note.id)
          await notesService.removeNote(route.params.projectId, props.note.id, route.params.backlogItemId)
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
