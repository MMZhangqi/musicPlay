import { computed } from "vue"
import { useStore } from "vuex"

export function useMode(){
    const store = useStore()
    const playMode = computed(()=>store.state.playMode)
    const modeIcon = computed(() => {
        const playModeValue = playMode.value
        switch (playModeValue) {
            case 0://顺序
                return 'icon-sequence'
                break;
            case 1://单曲循环
                return 'icon-loop'
                break;
            case 2://随机
                return 'icon-random'
                break;
        }
    })

    function changeMode(){
        const mode = (playMode.value + 1) % 3
        store.dispatch('changeMode', mode)
    }

    return {
        modeIcon,
        changeMode
    }
}