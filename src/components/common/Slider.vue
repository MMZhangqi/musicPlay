<template>
    <!--3挂载上去 -->
    <div class="slider" ref="rootRef">
        <div class="slider-group" >
            <div class="slider-page" v-for="(item, index) in sliders" :key="index">
                <img :src="item.pic" alt="">
            </div>
        </div>
        <div class="dots-wrapper">
            <span
            class="dot"
            v-for="(item, index) in sliders"
            :key="index"
            :class="{'active': currentPageIndex === (index - 1)}"
            ></span>
        </div>
    </div>
</template>

<script setup>
// 1.引用userslider
import {useSlider} from '@/assets/js/useSlider'
// 父组件组件传过来的数据
const props = defineProps({
    sliders: {
        type: Array,
        require: true,
    }
})
const {rootRef,currentPageIndex} = useSlider()
</script>

<style lang="scss" scoped>
.slider {
    min-height: 1px;
    font-size: 0;
    touch-action: pan-y;
    position: relative;
    .slider-group {
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        .slider-page {
            display: inline-block;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            img {
                display: block;
                width: 100%;
            }
        }
    }
    .dots-wrapper {
        position: absolute;
        left: 50%;
        bottom: 12px;
        line-height: 12px;
        transform: translateX(-50%);
        .dot {
            display: inline-block;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            transform: translateZ(1px);
            border-radius: 50%;
            background: $color-text-l;
            &.active {
                width: 20px;
                border-radius: 5px;
                background: $color-text-ll;
            }
        }
    }
}
</style>