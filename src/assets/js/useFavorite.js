import storage from './Storage-api'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

export function useFavorite(){
    const store = useStore()
    const favoriteList = computed(() => store.state.favoriteList)
    const currentSong = computed(() => store.getters.currentSong)

    const favoriteIcon = computed(() => {
        return isFavorite(currentSong.value) ? 'icon-favorite' : 'icon-not-favorite'
    })

    function isFavorite(song){
        // 为true在喜欢列表里，false不再喜欢列表里
        return favoriteList.value.findIndex(item => item.id === song.id) > -1
    }

    onMounted(() => {
        //用上本地存储
        if(!favoriteList.value.length){
            let list = storage.getLocal('__favoriteList__') ? storage.getLocal('__favoriteList__') : []
            if(list.length){
                store.commit('setFavoriteList', list)
            }
        } 
    })

    function toggleFavorite(){
        const song = currentSong.value
        let list = favoriteList.value.slice()
        if(isFavorite(song)){
            // 在喜欢列表里面就删除
            let index = list.findIndex(item => item.id === song.id)
            list.splice(index, 1)
        }else{
            // 不在就添加
            list.unshift(song)
        }
        store.commit('setFavoriteList', list)
        storage.setLocal('__favoriteList__', list)
    }

    return {
        favoriteIcon,
        toggleFavorite
    }
}