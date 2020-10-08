<template>
  <div id="app">
    <agenda-component></agenda-component>
  </div>
</template>

<script>
import AgendaComponent from './components/AgendaComponent.vue'

export default {
  name: 'App',
  components: {
    AgendaComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
