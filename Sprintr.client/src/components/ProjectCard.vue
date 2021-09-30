<template>
  <div class="card card-custom-wide">
    <div class="card-body p-2">
      <h4>  {{ project.name }}</h4>
      <small> Created on {{ new Date(project.createdAt).toLocaleDateString() }} at {{ new Date(project.createdAt).toLocaleTimeString() }}</small>
      <div class="col-2 card-custom-avatar" v-if="project.creator">
        <img class="img-flex" :src="project.creator.picture" :title=" project.creator.name">
      </div>
      <div class="link-custom">
        <router-link :to="{name: 'Project', params: {projectId: project.id}}" class="selectable">
          Take me to project page
        </router-link>
        <i v-if="account.id == project.creatorId" class="mdi mdi-delete-sweep text-secondary selectable ps-3 f-18" aria-hidden="true" title="Delete Project" @click="removeProject"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { Project } from '../models/Project'
import { projectsService } from '../services/ProjectsService'

import Pop from '../utils/Pop'
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
      projects: computed(() => AppState.projects),
      async removeProject() {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete?')
          if (!yes) { return }
          await projectsService.deleteProject(props.project.id)
          Pop.toast('Project has been deleted!', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }

    }
  }
}
</script>

<style  >
.card-custom-wide {
  overflow: hidden;
  border: 0;
  width: 100%;
  height: 80px;
  box-shadow: 0 0 15px rgba(10, 10, 10, 0.3);
}

.card-custom-wide-img {
  height: 100px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.card-custom-wide .card-custom-avatar img {
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(10, 10, 10, 0.3);
  position: absolute;
  top: 15px;
  left: 43.3%;
  left: calc(50% - 75px);
  width: 100px;
  height: 100px;
}

.link-custom {
  position: absolute;
  top: 20px;
  left: 80%;
}
</style>
