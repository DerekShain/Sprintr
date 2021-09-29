<template>
  <div class="card text-center">
    <div class="card-header">
      <div class="collapse" id="navbarToggleExternalContent">
        <div class="bg-dark p-4">
          <li class="nav-item">
            <router-link :to="{name:'Project.Backlog'}" class="text-white lighten-30 bg-dark nav-link active">
              Backlogs
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name:'Project.Sprint'}" class="text-white bg-dark lighten-30 nav-link active">
              Sprints
            </router-link>
          </li>
        </div>
      </div>
      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <button class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarToggleExternalContent"
                  aria-controls="navbarToggleExternalContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  title="Menu"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <ul class="nav nav-tabs card-header-tabs">
        <!-- <li class="nav-item">
          <router-link :to="{name:'Project.Backlog'}" class="text-dark lighten-30 nav-link active">
            Backlogs
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'Project.Sprint'}" class="text-dark lighten-30 nav-link active">
            Sprints
          </router-link>
        </li> -->
      </ul>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        {{ project.name }}
      </h5>
      <p class="card-text">
        {{ project.description }}}}
      </p>
      <router-view />
    </div>
  </div>

  <!-- <div class="row">
    <div class="card">
      {{ project.name }}
      <p>{{ project.description }}</p>
      <router-link :to="{name:'Project.Backlog'}" class="text-dark lighten-30">
        Backlogs
      </router-link>
      <router-link :to="{name:'Project.Sprint'}" class="text-dark lighten-30">
        Sprints
      </router-link>
    </div>
    <router-view />
  </div> -->
</template>

<script>
import { AppState } from '../AppState.js'
import { Project } from '../models/Project.js'
import { computed } from '@vue/runtime-core'

export default {
  props: {
    project: {
      type: Project,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
