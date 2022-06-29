const getters = {
    // 获取当前播放歌曲对象
    currentSong(state){
        return state.sequenceList[state.currentIndex] || []
    }
}

export default getters