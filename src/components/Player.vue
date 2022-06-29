<template>
    <div class="singer-detail">
        singerdetail
    </div>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

const store = useStore()

// vuex
const fullScreen = computed(()=>{store.state.fullScreen})//全屏播放状态 true/false
const playList = computed(()=>{store.state.playList})//源播放列表
</script>

<style lang="scss" scoped>
.singer-detail{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $color-background;
    z-index: 1;
}
</style>