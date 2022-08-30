<template>
  <nav>
    <MyHeader></MyHeader>
    <MyTabBar></MyTabBar>
    <router-view></router-view>
  </nav>
  <MyPlayer></MyPlayer>
</template>

<script setup>
import MyHeader from './components/Header.vue'
import MyTabBar from './components/Tabbar.vue'
import MyPlayer from './components/Player'
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
