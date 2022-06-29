import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import {ref, onMounted, onUnmounted, onActivated, onDeactivated} from 'vue'

BScroll.use(Slide)

export function useSlider(){
//    创建silder对象
    const slider = ref(null)
    const rootRef = ref(null)
    const currentPageIndex = ref(0)

    onMounted(() => {
        // new Bscroll(需要挂载DOM，配置对象，支持的功能)
        slider.value = new BScroll(rootRef.value, {
            slide: true,//挂件激活
            click: true,//允许点击
            scrollX: true,//横向滚动
            scrollY: false,
            momentum: false,//不根据滑动的距离和时间计算生成滚动动画
            bounce: false,//不需要回弹
            probeType: 2,//派发scroll事件的频率，仅仅在当前只按的滚动区域上，一直派发scroll事件
        })
        // 页面页码发生改变时触发事件
        slider.value.on('slideWillChange', (page) => {
            currentPageIndex.value = page.pageX
        })
        // 销毁
        onUnmounted(() => {
            slider.value.destroy()
        })
        // 激活时
        onActivated(()=>{
            slider.value.enable//恢复功能
            slider.value.refresh//刷新
        })
        // 
        onDeactivated(()=>{
            slider.value.enable
        })
    })
    return {
        rootRef,
        currentPageIndex
    }
}