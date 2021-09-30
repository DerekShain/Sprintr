<template>
  <header>
    <Navbar />
  </header>
  <main class="custom-bg">
    <router-view />
  </main>
  <footer>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.custom-bg{
  background: url('./assets/img/Animation.gif');
  background-attachment: fixed;
}
  //  /* .row{
  //           height: 100px;
  //       } */
  //   *{
  //       outline: red solid 1px;
  //   }
</style>
