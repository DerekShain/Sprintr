<template>
  <div class="d-flex flex-column align-items-center p-4">
    <div class="card p-5 bg-white rounded elevation-3 ">
      <div class="d-grid gap-2 d-md-flex justify-content-md-end ">
        <Project />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Project',
  setup() {
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),
      project: computed(() => AppState.project)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
