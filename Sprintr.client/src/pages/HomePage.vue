<template>
  <div class="home d-flex flex-column align-items-center p-4">
    <div class="home-card p-2 bg-dark rounded elevation-3 ">
      <div class="d-grid gap-2 d-md-flex justify-content-md-end ">
        <button class="btn btn-primary " type="submit" data-bs-toggle="modal" data-bs-target="#project-form">
          Create Project
        </button>
      </div>
      <div class="d-flex flex-column align-items-center">
        <ProjectCard v-for="p in projects" :key="p.id" :project="p" class="m-2" />
      </div>
    </div>
  </div>

  <ProjectModal>
    <template #modal-title>
      <h4>Project Form</h4>
    </template>
    <template #modal-body>
      <ProjectForm />
    </template>
  </ProjectModal>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await projectsService.getProjects()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),
      project: computed(() => AppState.project)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  // place-content: center;
  // text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 600px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
