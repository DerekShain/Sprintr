<template>
  <div v-if="currentBacklog.edit">
    <form @submit.prevent="editDetails()">
      <div class="my-2">
        <label class="form-label" for="name">Update Backlog Item Name</label>
        <div class="form-group">
          <label for="name"></label>
          <input type="text"
                 class="form-control"
                 name="name"
                 id="name"
                 placeholder="Backlog Item Name"
                 v-model="editable.name"
                 required
          >
        </div>
      </div>
      <label for="sprintId">Assign to Sprint: </label>
      <select v-model="editable.sprintId" id="sprintId" name="sprintId">
        <option v-for="s in sprints" :key="s.id" :value="s.id">
          {{ s.name }}
        </option>
      </select>

      <!-- <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Assign to Sprint
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li class="selectable" v-for="s in sprints" :key="s.id" @change="editable.sprintId">
              {{ s.name }}
            </li>
          </ul>
        </div> -->
      <div class="row">
        <input v-model="editable.status" type="radio" id="pending" name="status" value="pending">
        <label for="pending">Pending</label>
        <input v-model="editable.status" type="radio" id="in-progress" name="status" value="in-progress">
        <label for="in-progress">In-Progress</label>
        <input v-model="editable.status" type="radio" id="review" name="status" value="review">
        <label for="review">Review</label>
        <input v-model="editable.status" type="radio" id="done" name="status" value="done">
        <label for="done">Done</label>
      </div>
      <div class="btn-group">
        <button type="submit" class="btn btn-success">
          Save
        </button>
        <button type="reset" class="btn btn-muted">
          Cancel
        </button>
      </div>
    </form>
  </div>
  <div v-else>
    <div class="row">
      <h6>Assigned to:</h6>
      <h5>Sprint 1</h5>
    </div>
    <div class="row">
      <h3 class="mb-3">
        Status
      </h3>
      <div class="status">
        Pending
      </div>
      <div class="status">
        In-Progress
      </div>
      <div class="status">
        Review
      </div>
      <div class="status">
        Done
      </div>
    </div>
  </div>
  <div class="row text-center">
    <h4>Notes</h4>
  </div>
  <div class="row">
    <form @submit.prevent="addNote()">
      <div class="col d-flex">
        <textarea class="form-control w-75" placeholder="Leave a comment here" id="body" style="height: 100px" v-model="editable.body"></textarea>
        <button type="submit" class="btn btn-success w-25">
          <i class="mdi mdi-send f-28"></i>
        </button>
      </div>
    </form>
  </div>
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
