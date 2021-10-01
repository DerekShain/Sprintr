<template>
  <!-- <div class="col-11 py-5 my-3 ">
    <div class="row bg-light">
      <div class="col-6">
        <h1>Sprint: {{ sprint.name }}</h1>
      </div>
      <div class="backlogList"> -->
  <!-- NOTE middle protion -->
  <!-- <form @submit.prevent="getBacklogById()">
          <div class="form-group">
            <label class="pr-2" for="backlog-sprint-select">Select a backlog item</label>
            <select name="backlogs"
                    id="backlogs"
                    required
                    class="form-control"
            >
              <option v-for="b in backlogs"
                      :key="b.name"
              >
                {{ b.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-success mt-3">
              Submit
            </button>
          </div>
        </form> -->
  <!-- NOTE bottom -->
  <!-- </div>
  <div class="col-6 mt-3">
    <button class="btn btn-ponk text-dark hoverable mx-2" @click="removeSprint()" title="Sprint">
      <i class="fa fa-trash text-dark"></i>
      Delete
    </button>
  </div>
  </div>
  </div> -->

  <div class="card m-2">
    <h5 class="card-header text-center">
      {{ sprint.name }}
    </h5>
    <div class="card-body">
      <h5 class="card-title"></h5>
      <p class="card-text">
        Scheduled from:
        <small> {{ new Date(sprint.startDate).toLocaleDateString() }}</small>-
        <small>{{ new Date(sprint.endDate).toLocaleDateString() }} </small>
      </p>
      <button class="btn btn-dark text-light hoverable mx-2" @click="removeSprint()" title="Sprint">
        <i class="mdi mdi-delete text-light"></i>
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { sprintsService } from '../services/SprintsService.js'
import { useRoute } from 'vue-router'
import { backlogsService } from '../services/BacklogsService.js'

export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    onMounted(async() => {
      try {
        await backlogsService.getBacklogs(route.params.projectId)
      } catch (error) {
        Pop.toast('error on the backlog page', error)
      }
    })
    return {
      route,
      account: computed(() => AppState.account),
      sprints: computed(() => AppState.sprints),
      backlog: computed(() => AppState.backlog),
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
