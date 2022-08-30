<template>
    <div class="music-list" >
        <!-- 返回按钮 -->
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <!-- title -->
        <h1 class="title">{{ listTitle }}</h1>
        <!-- 封面背景图 -->
        <div class="bg-image" :style="bgImageStyle" ref="imageRef">
            <div class="play-btn-wrapper" :style="playBtnStyle">
                <div class="play-btn" v-if="songs.length">
                    <i class="icon-play"></i>
                    <div class="text" @click="addAll">顺序播放全部歌曲</div>
                </div>
            </div>
            <!-- 模糊遮罩 -->
            <div class="filter" :style="filterStyle"></div>
        </div>
        <!-- 歌曲列表 -->
        <MyScroll v-loading="loading" class="list" :probeType="3" :style="scrollStyle" @scroll="onScroll">
            <div class="song-list-wrapper">
                <MySongList :songs="songs"></MySongList>
            </div>
        </MyScroll>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import {useRouter} from 'vue-router'
import MySongList from '@/components/common/SongList'
import MyScroll from '@/components/common/Scroll'
import { useStore } from 'vuex'

const store = useStore()

const scrollY = ref(0)
const imageHeight = ref(0)
const imageRef = ref(null)
const maxTranslateY = ref(0)
const router = useRouter()

const props = defineProps({
    songs: {
        type: Array,
        default: []
    },
    listTitle: {
        type: String,
    },
    picUrl: {
        type: String,
    },
    loading: {
        type: Boolean
    }
})

// 返回上一级
const back = function goBack(){
    router.go(-1)
}

function onScroll(pos){
    scrollY.value = -pos.y
}
const bgImageStyle = computed(()=>{
    let height = "40%"
    let zIndex = "0"
    let scale = 1
    // 上拉
    if(scrollY.value > maxTranslateY.value){
        // 触发滚动临界
        height = "40px"
        zIndex = '1'
    }
    // 下拉列表
    if(scrollY.value < 0){
        // 往下拉了多少bgimage,放大多少transform: scale(1+???)
        // scrollY.value = bgImage放大的量 = (???) * bgImage原本的高度
        // (???) = scrollY.value / bgImage的高度
        scale = -scrollY.value / imageHeight.value + 1
    }
    return {
        backgroundImage: `url(${props.picUrl})`,
        height,
        zIndex,
        transform: `scale(${scale})`
    }
})

const filterStyle = computed(() =>{
    let blur = 0
    if(scrollY.value > 0){
        blur = Math.min(scrollY.value / 25, 10)
    }    
    return {
        backdropFilter: `blur(${blur}px)`
    }
})
const playBtnStyle = computed(() => {
    let display = "block"
    if(scrollY.value > maxTranslateY.value){
        // 触发滚动临界
        display = "none"
    }
    return {
        display
    }
})
const scrollStyle = computed(() =>{
    return {
        top: `${imageHeight.value}px`
    }
})
onMounted(() => {
    // 获取背景div的高度
    imageHeight.value = imageRef.value.clientHeight;
    maxTranslateY.value = imageHeight.value -40
})

function addAll(){
    store.dispatch("addAllPlay", props.songs)
}
</script>

<style lang="scss" scoped>
.music-list {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 20;
        transform: translateZ(2px);
        .icon-back {
            display: block;
            padding: 10px;
            font-size: $font-size-large-x;
            color: $color-theme;
        }
    }
    .title {
        position: absolute;
        top: 0;
        left: 10%;
        width: 80%;
        z-index: 20;
        transform: translateZ(2px);
        @include no-wrap();
        text-align: center;
        line-height: 40px;
        font-size: $font-size-large;
        color: $color-text;
    }
    .bg-image {
        position: relative;
        width: 100%;
        height: 40%;
        transform-origin: top;
        background-size: cover;
        z-index: 0;
        .play-btn-wrapper {
            position: absolute;
            bottom: 20px;
            z-index: 10;
            width: 100%;
            .play-btn {
                box-sizing: border-box;
                width: 135px;
                padding: 7px 0;
                margin: 0 auto;
                text-align: center;
                border: 1px solid $color-theme;
                color: $color-theme;
                border-radius: 100px;
                font-size: 0;
            }
            .icon-play {
                display: inline-block;
                vertical-align: middle;
                margin-right: 6px;
                font-size: $font-size-medium-x;
            }
            .text {
                display: inline-block;
                vertical-align: middle;
                font-size: $font-size-small;
            }
        }
        .filter {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(7, 17, 27, 0.4);
        }
    }
    .list {
        position: absolute;
        bottom: 0;
        width: 100%;
        z-index: 0;
        .song-list-wrapper {
            padding: 20px 30px;
            min-height: 350px;
            background: $color-background;
        }
    }
}
</style>