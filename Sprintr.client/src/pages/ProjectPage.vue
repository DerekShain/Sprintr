<template>
  <nav class="navbar navbar-dark bg-dark text-white text-center">
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
  <div class="d-flex flex-column align-items-center p-4">
    <div class="card p-5 bg-white rounded elevation-3 ">
      <div class="d-grid gap-2 d-md-flex justify-content-md-end ">
        <Project :project="project" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { projectsService } from '../services/ProjectsService'
export default {
  setup() {
    const route = useRoute()
    onMounted(() =>
      projectsService.getProjectById(route.params.projectId)
    )
    return {
      account: computed(() => AppState.account),
      // projects: computed(() => AppState.projects),
      project: computed(() => AppState.project)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
