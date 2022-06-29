import { ref, onMounted, nextTick, watch, computed } from 'vue'
export default function useFixed(props){
    const scrollY = ref(0)
    const groupRef = ref(null)
    // 用于记录li高度的数组
    const listHeight = ref([])
    // 用于记录tagIndex
    const currentIndex = ref(0)
    // 用于记录底部和滚动距离的差值
    const instance = ref(0)

    // 记录滚动距离
    const onScroll = (pos) => {
        scrollY.value = -pos.y
    }
    
    const fixedTitle = computed(()=>{
        if(scrollY.value < 0){
            return ""
        }
        return props.singerList[currentIndex.value] ? props.singerList[currentIndex.value].tag : "热"
    })
    const fixStyle = computed(() => {
        let diff = 0//差值
        if(instance.value > 0 && instance.value < 30){
            // 需要修改css的transform
            diff = instance.value - 30
        }
        return {
            transform: `translate(0, ${diff}px)`
        }
    })

    // 计算li高度的事件处理函数
    function caculate(){
        const list = groupRef.value.children
        const listHeightVal = listHeight.value
        // 初始化高度
        let height = 0
        listHeightVal.length = 0
        listHeightVal.push(height)

        for (let i = 0; i < list.length; i++) {
            height += list[i].clientHeight;
            listHeightVal.push(height)
        }
    }

    watch(()=> props.singerList, async()=>{
        await nextTick()//页面节点更新完毕之后再去更新
        caculate()
    })

    watch(scrollY, (newVal)=>{
        let listHeightVal = listHeight.value
        for (let i = 0; i < listHeightVal.length; i++) {
            const top = listHeightVal[i]
            const bottom = listHeightVal[i+1]
            if(newVal >= top &&newVal <= bottom){
                currentIndex.value = i
                instance.value = bottom - newVal
            }   
        }
    })

    onMounted(() => {
        caculate()
    })

    return {
        onScroll,
        groupRef,
        fixedTitle,
        currentIndex,
        fixStyle
    }
}