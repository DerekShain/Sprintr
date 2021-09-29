<template>
  <div class="card text-center">
    <div class="card-header">
      <!-- NOTE First navbar -->
      <nav class="navbar navbar-dark bg-dark text-white">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Project Item First Navbar</a>
          <button class="navbar-toggler"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasNavbar"
                  aria-controls="offcanvasNavbar"
                  title="Menu"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                Projects
              </h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <!-- NOTE Backlog Link -->
                <li class="nav-item" data-bs-dismiss="offcanvas">
                  <router-link :to="{name:'Project.Backlog'}" class="text-white lighten-30 nav-link btn">
                    Backlogs
                  </router-link>
                </li>
                <!-- NOTE Sprints Link -->
                <li class="nav-item" data-bs-dismiss="offcanvas">
                  <router-link :to="{name:'Project.Sprint'}" class="text-white lighten-30 btn">
                    Sprints
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <!-- NOTE Second Nabar -->
      <div class="collapse" id="navbarToggleExternalContent">
        <div class="bg-dark p-4">
          <!-- <li class="nav-item"> -->
          <router-link :to="{name:'Project.Backlog'}" class="text-white lighten-30 bg-dark nav-link active">
            Backlogs
          </router-link>
          <!-- </li> -->
          <!-- <li class="nav-item"> -->
          <router-link :to="{name:'Project.Sprint'}" class="text-white bg-dark lighten-30 nav-link active">
            Sprints
          </router-link>
          <!-- </li> -->
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
            <span class="navbar-toggler-icon"> </span>Project Item Second Navbar
          </button>
        </div>
      </nav>
      <!-- NOTE end of navbars -->
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
        {{ project.description }}
      </p>
      <router-view />
    </div>
  </div>
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
