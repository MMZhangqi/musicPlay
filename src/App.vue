<template>
  <MyHeader></MyHeader>
  <nav>
    <MyTabBar></MyTabBar>
  </nav>
  <router-view/>
</template>

<script setup>
import MyHeader from './components/Header.vue'
import MyTabBar from './components/Tabbar.vue'
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-text;
}
</style>
