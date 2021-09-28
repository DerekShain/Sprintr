<template>
  <div class=" flex-grow-1 d-flex flex-column">
    <div class="card p-5 bg-white rounded elevation-3">
      <button class="btn btn-primary" type="submit" data-bs-toggle="modal" data-bs-target="#project-form">
        Create Project
      </button>
      <ProjectCard v-for="p in projects" :key="p.id" :project="p" />
    </div>
  </div>

  <Modal>
    <template #modal-title>
      <h4>Project Form</h4>
    </template>
    <template #modal-body>
      <ProjectForm />
    </template>
  </Modal>
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
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
