<template>
    <div>
        <div class="player" v-if="playList.length">
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img :src="currentSong.al.picUrl" />
                </div>
                <div class="top">
                    <div class="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title">{{ currentSong.name }}</h1>
                    <h2 class="subtitle">{{ handle(currentSong) }}</h2>
                </div>
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper playing" :style="cdStyle">
                            <div class="cd">
                                <img class="image" :src="currentSong.al.picUrl" />
                            </div>
                        </div>
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric">歌词占位</div>
                        </div>
                    </div>
                    <!-- middle-r -->
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time time-l">{{formatTime(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <MyProgressBar :progress="progress"></MyProgressBar>
                        </div>
                        <span class="time time-r">{{formatTime(duration)}}</span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i :class="modeIcon" @click="changeMode"></i>
                        </div>
                        <div class="icon i-left">
                            <i class="icon-prev" @click="prev"></i>
                        </div>
                        <div class="icon i-center">
                            <i :class="playIcon" @click="togglePlay"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-next" @click="next"></i>
                        </div>
                        <div class="icon i-right">
                            <i :class="favoriteIcon" @click="toggleFavorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <audio ref="audioRef" @timeupdate="updateTime" @canplay="ready"></audio>
    </div>
</template>

<script setup>
import MyProgressBar from '@/components/common/ProgressBar'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { getSongUrl} from '@/service/song'
import { useMode } from '@/assets/js/useMode'
import { useFavorite } from '@/assets/js/useFavorite'
import { formatTime } from '@/assets/js/utils'

const store = useStore()
const audioRef = ref(null)
const currentTime = ref(0) //当前播放时长
const duration = ref(0) //总时长
// vuex
const fullScreen = computed(()=>store.state.fullScreen)//全屏播放状态 true/false
const playList = computed(()=>store.state.playList)//源播放列表
const sequenceList = computed(()=>store.state.sequenceList)//当前播放列表
const currentIndex = computed(()=>store.state.currentIndex)//当前播放歌曲下标
const currentSong = computed(()=>store.getters.currentSong)//当前播放歌曲
const playing = computed(() => store.state.playing)


// Hooks
const { modeIcon, changeMode } = useMode()
const { favoriteIcon, toggleFavorite } = useFavorite()

// 播放进度 0 ~ 1
const progress = computed(() => {
    if(!audioRef.value) return;
    return currentTime.value / duration.value;
})
const playIcon = computed(() => (playing.value ? "icon-pause" : "icon-play"))
const cdStyle = computed(() => {
    animationPlayState: playing.value ? 'running' : 'pause'
})

watch(currentSong, async (newSong)=>{
    // 空对象
    if(!newSong.id) return
    const { data } = await getSongUrl(newSong);
    const url = data[0].url
    let playListValue = playList.value.slice()
    let sequenceListValue = sequenceList.value.slice()
    // 没有版权
    if(!url){
        // 请求失败，从列表移出，播放下一首
        let indexP = playListValue.findIndex(item => item.id === newSong.id)
        let indexS = sequenceListValue.findIndex(item => item.id === newSong.id)
        playListValue.splice(indexP, 1)
        sequenceListValue.splice(indexS ,1)
        store.commit("setCurrentIndex",
        // 如果请求不到URL的，是最后一首歌，
        indexS >= sequenceListValue.length ? 0 : indexS)

        return
    }
    // 请求成功
    let audio = audioRef.value
    audio.src = url
    audio.play();
    store.commit("setPlayingState", true)
})

watch(playing, newPlaying =>{
    let audio = audioRef.value
    if(newPlaying)
    // 播放
        audio.play()
    else
    // 暂停
        audio.pause()
})

function handle(item){
    return item.ar.map((nameobj) => {
        return nameobj.name
    }).join("-")
} 

// 播放、暂停图标
function togglePlay() {
    // 切换播放状态
    store.commit("setPlayingState", !playing.value)
}
// 单曲循环
function loop(){
    const audio = audioRef.value
    // currentTime 当前播放时间为0
    audio.currentTime = 0;
    audio.play()
    store.commit('setPlayingState', true)
}
// 上一首
function prev(){
    const list = sequenceList.value
    // 如果没有歌
    if(!list.length) return
    if(list.length === 1) return loop();//单曲循环
    let index = currentIndex.value - 1
    if(index === -1){
        // 说明当前歌曲是列表第一项
        index = list.length - 1
    }
    store.commit("setCurrentIndex", index)
}
// 下一首
function next(){
    const list = sequenceList.value
    // 如果没有歌
    if(!list.length) return
    if(list.length === 1) return loop();//单曲循环
    let index = currentIndex.value + 1
    if(index === list.length){
        // 说明当前歌曲是最后一首
        index = 0
    }
    store.commit("setCurrentIndex", index)
}
// 当前时长
function updateTime(){
    currentTime.value = audioRef.value.currentTime
}
// 总时长
function ready(){
    duration.value = audioRef.value.duration
}
</script>

<style lang="scss" scoped>
.player {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    .normal-player {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        background: $color-background;
        .background {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.6;
            filter: blur(20px);
            img {
                height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .top {
            position: relative;
            margin-bottom: 25px;
            .back {
                position: absolute;
                top: 0;
                left: 6px;
                z-index: 50;
            }
            .icon-back {
                display: block;
                padding: 9px;
                font-size: $font-size-large-x;
                color: $color-theme;
                transform: rotate(-90deg);
            }
            .title {
                width: 70%;
                margin: 0 auto;
                line-height: 40px;
                text-align: center;
                @include no-wrap();
                font-size: $font-size-large;
                color: $color-text;
            }
            .subtitle {
                line-height: 20px;
                text-align: center;
                font-size: $font-size-medium;
                color: $color-text;
            }
        }
        .middle {
            position: fixed;
            width: 100%;
            top: 80px;
            bottom: 170px;
            white-space: nowrap;
            font-size: 0;
            .middle-l {
                display: inline-block;
                vertical-align: top;
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 80%;
                .cd-wrapper {
                    position: absolute;
                    left: 10%;
                    top: 0;
                    width: 80%;
                    box-sizing: border-box;
                    height: 100%;
                    overflow: hidden;
                    height: 100%;
                    border-radius: 50%;
                    border: 10px solid rgba(255, 255, 255, 0.1);
                    &.playing {
                        animation: rotate 20s linear infinite;
                    }
                    .cd {
                        width: 100%;
                        img {
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            height: 100%;
                            box-sizing: border-box;
                            transform: translate(-50%, -50%);
                        }
                    }
                }
                .playing-lyric-wrapper {
                    width: 80%;
                    margin: 30px auto 0 auto;
                    overflow: hidden;
                    text-align: center;
                    .playing-lyric {
                        height: 20px;
                        line-height: 20px;
                        font-size: $font-size-medium;
                        color: $color-text-l;
                    }
                }
            }
            .middle-r {
                display: inline-block;
                vertical-align: top;
                width: 100%;
                height: 100%;
                overflow: hidden;
                .lyric-wrapper {
                    width: 80%;
                    margin: 0 auto;
                    overflow: hidden;
                    text-align: center;
                    .text {
                        line-height: 32px;
                        color: $color-text-l;
                        font-size: $font-size-medium;
                        &.current {
                            color: $color-text;
                        }
                    }
                    .pure-music {
                        padding-top: 50%;
                        line-height: 32px;
                        color: $color-text-l;
                        font-size: $font-size-medium;
                    }
                }
            }
        }
        .bottom {
            position: absolute;
            bottom: 50px;
            width: 100%;
            .dot-wrapper {
                text-align: center;
                font-size: 0;
                .dot {
                    display: inline-block;
                    vertical-align: middle;
                    margin: 0 4px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: $color-text-l;
                    &.active {
                        width: 20px;
                        border-radius: 5px;
                        background: $color-text-ll;
                    }
                }
            }
            .progress-wrapper {
                display: flex;
                align-items: center;
                width: 80%;
                margin: 0px auto;
                padding: 10px 0;
                .time {
                    color: $color-text;
                    font-size: $font-size-small;
                    flex: 0 0 40px;
                    line-height: 30px;
                    width: 40px;
                    &.time-l {
                        text-align: left;
                    }
                    &.time-r {
                        text-align: right;
                    }
                }
                .progress-bar-wrapper {
                    flex: 1;
                }
            }
            .operators {
                display: flex;
                align-items: center;
                .icon {
                    flex: 1;
                    color: $color-theme;
                    &.disable {
                        color: $color-theme-d;
                    }
                    i {
                        font-size: 30px;
                    }
                }
                .i-left {
                    text-align: right;
                }
                .i-center {
                    padding: 0 20px;
                    text-align: center;
                    i {
                        font-size: 40px;
                    }
                }
                .i-right {
                    text-align: left;
                }
                .icon-favorite {
                    color: $color-theme;
                }
            }
        }
        &.normal-enter-active,
        &.normal-leave-active {
            transition: all 0.6s;
            .middle-l,
            .top,
            .bottom {
                transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
            }
        }
        &.normal-enter-from,
        &.normal-leave-to {
            opacity: 0;
            .top {
                transform: translate3d(0, -100px, 0);
            }
            .bottom {
                transform: translate3d(0, 100px, 0);
            }
            .middle-l {
                transform: scale(0);
            }
        }
    }
}
</style>