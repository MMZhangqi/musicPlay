import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import {ref, onMounted, onUnmounted, onActivated, onDeactivated} from 'vue'

BScroll.use(ObserveDOM)

export function useScroll(props, emit) {
    const rootRef = ref(null)
    const scroll = ref(null)
    
    onMounted(() => {
        scroll.value = new BScroll(rootRef.value, {
            observeDOM: true,//开启observe-dom插件， 深度监听
            ...props
        })
        // 获取实时滚动距离
        if(props.probeType > 0){
            // 外部是better-scroll对象，自带的
            scroll.value.on('scroll', (pos) =>{
                // 触发父组件的内的scroll自定义事件
                emit('scroll', pos)
            })
        }
    })

    onUnmounted(() => {
        scroll.value.destroy()
    })
    // 激活时
    onActivated(()=>{
        scroll.value.enable()//恢复功能
        scroll.value.refresh()//刷新
    })
    // 
    onDeactivated(()=>{
        // 失去功能
        scroll.value.disable()
    })

    return {
        rootRef,
        scroll
    }
}