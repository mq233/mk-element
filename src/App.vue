<template>
  <div id="app">
    <mk-avatar src="./1.png"/>
    <mk-avatar :src="logo"/>
  </div>
</template>

<script>
import Logo from './assets/logo.png'

export default {
  name: 'App',
  data() {
    return {
      logo: Logo
    }
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
