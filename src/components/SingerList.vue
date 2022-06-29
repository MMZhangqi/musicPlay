<template>
    <MyScroll class="singer-list" @scroll="onScroll" :probeType="3" ref="scrollRef">
        <!-- 歌手列表 -->
        <ul class="view-scroll" ref="groupRef">
            <li class="group"  v-for="group in singerList" :key="group.tag">
                <h2 class="title">
                    {{group.tag}}
                </h2>
                <ul @click="selectItem(item)" class="item" v-for="item in group.nameArr" :key="item.id">
                    <li class="avatar">
                        <img v-img-lazy="item.picUrl" width="40" alt="">
                    </li>
                    <span class="name">{{ item.name }}</span>
                </ul>
            </li>
        </ul>
        <!-- 吸附顶部 -->
        <div class="fixed" v-show="fixedTitle" :style="fixStyle" >
            <h2 class="fixed-title" >{{ fixedTitle }}</h2>
        </div>
        <!-- 首字母 -->
        <div class="shortcut">
            <ul>
                <li 
                class="item"
                :class="{ current: currentIndex===index }" 
                v-for="(item,index) in arrStr"
                :key="index"
                :data-index="index"
                @touchstart.prevent="onShortcutTouchStart"
                @touchmove.prevent="onShortcutTouchMove">{{ item }}</li>
            </ul>
        </div>
    </MyScroll>
</template>


<script setup>
import MyScroll from '@/components/common/Scroll'
import useFixed from '@/assets/js/useFixed'
import useShortcut from '@/assets/js/useShortcut'

const emit = defineEmits(['select'])
const props = defineProps(["singerList", "arrStr"])

const { onScroll, groupRef, fixedTitle, fixStyle, currentIndex} = useFixed(props)
const { scrollRef, onShortcutTouchStart, onShortcutTouchMove } = useShortcut(groupRef)

function selectItem(item){
    emit("select", item)
}
</script>

 <style lang="scss" scoped>
.singer-list {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .group {
        padding-bottom: 30px;
        .title {
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }
        .item {
            display: flex;
            align-items: center;
            padding: 20px 0 0 30px;
            .avatar {
                position: relative;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                img {
                    position: absolute;
                    width: 130%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
            .name {
                margin-left: 20px;
                color: $color-text-l;
                font-size: $font-size-medium;
            }
        }
    }
    // 吸附顶部
    .fixed{
        position: absolute;
        height: 30px;
        top: 0;
        left: 0;
        width: 100%;
        .fixed-title{
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }
    }
    // 首字母索引样式
    .shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        // 高亮当前区间的字母高亮
        color: $color-theme;
        // color: red;
      }
    }
  }
}
</style>