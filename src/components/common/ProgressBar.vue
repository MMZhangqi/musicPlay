<template>
    <div class="progress-bar">
        <!-- 播放进度条容器 -->
        <div class="bar-inner" ref="progressWrapperRef">
            <!-- 实际播放进度条 -->
            <div class="progress" :style="progressStyle"></div>
            <div class="progress-btn-wrapper" :style="btnStyle">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"

// 记录偏移量
const offset = ref(0)
// 高度和偏移量的最大范围
let maxNum = ref(0)
// btn的宽度
const btn = 16

const progressWrapperRef = ref(null)

const props = defineProps({
    progress: {
        type: Number,
        default: 0,
    }
})

watch(() => props.progress, (newProgress) => {
    offset.value = newProgress * maxNum.value
})

const progressStyle = computed(() => `width: ${offset.value}px`)
const btnStyle = computed(() => `transform: translate(${offset.value}px, 0)`)

// 播放时间 / 总时间 = 当前progress的宽度 / 总progress的宽度
// 总progress的宽度 = inner的宽度 - btn的宽度
onMounted(() => {
    maxNum.value = progressWrapperRef.value.clientWidth -btn;
})
</script>

<style lang="scss" scoped>
.progress-bar {
    height: 30px;
    .bar-inner {
        position: relative;
        top: 13px;
        height: 4px;
        background: rgba(0, 0, 0, 0.3);
        .progress {
            position: absolute;
            height: 100%;
            background: $color-theme;
        }
        .progress-btn-wrapper {
            position: absolute;
            left: -8px;
            top: -13px;
            width: 30px;
            height: 30px;
            .progress-btn {
                position: relative;
                top: 7px;
                left: 7px;
                box-sizing: border-box;
                width: 16px;
                height: 16px;
                border: 3px solid $color-text;
                border-radius: 50%;
                background: $color-theme;
            }
        }
    }
}
</style>