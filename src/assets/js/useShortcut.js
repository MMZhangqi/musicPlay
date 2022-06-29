import { ref } from 'vue'
export default function useShortcut(groupRef){
    const scrollRef = ref(null)
    const touch = {}
    // 触摸跳转对于的li
    function onShortcutTouchStart(e){
        // e.target.dataset 获取自定义属性的
        const  anchorIndex= e.target.dataset.index / 1  //数字转化

        touch.y1 = e.touches[0].pageY //手指落下的初始值
        touch.anchorIndex = anchorIndex //初始的index

        scrollTo(anchorIndex)
    }

    // 触摸移动
    function onShortcutTouchMove(e){
        // 通过触摸移动的量去计算当前的index
        touch.y2 = e.touches[0].pageY //正在变化的手指的位置
        // 偏移量的index
        const deletaIndex = Math.floor(( touch.y2 - touch.y1) / 18)
        // 当前手指摸到的字母的index
        const newAnchorIndex = touch.anchorIndex + deletaIndex
        scrollTo(newAnchorIndex)
    }

    function scrollTo(index){
        // 限制一下范围
        // index = Math.max(0, Math.min(index, groupRef.value.length-1)) //使用Math.min限制一个最小值
        const scroll = scrollRef.value.scroll
        const targetEl = groupRef.value.children[index]

        scroll.scrollToElement(targetEl)
    }

    return {
        scrollRef,
        onShortcutTouchStart,
        onShortcutTouchMove
    }
}