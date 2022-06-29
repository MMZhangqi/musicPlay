const actions = {
    // --------------- 添加一首歌到列表 ---------------
    addOnePlay({ commit, state } , list){
        const playList = [...state.playList] //源播放列表
        const sequenceList = [...state.sequenceList] //当前播放列表
        let currentIndex = state.currentIndex //当前播放的索引值

        // 新增歌曲放到当前播放歌曲的后面
        sequenceList.splice(currentIndex + 1, 0, list[0])
        // 判断加入的歌曲是否在当前播放列表
        let sequenceIndex = findIndex(sequenceList, list[0])
        if(sequenceIndex > 0){
            // 歌曲存在
            if(currentIndex < sequenceIndex){
                // 原本存在的歌曲在当前播放歌曲的后面
                // 1.将原来的歌曲在原列表删除
                sequenceList.splice(sequenceIndex + 1, 1)
                // 当前播放的索引值+1
                currentIndex++
            }else{
                // 在前面，删除原来的
                sequenceList.splice(sequenceIndex, 1)
            }
        }else{
            // 歌曲不存在
            currentIndex++
            // 添加到原歌曲列表
            playList.unshift(list[0])
        }

        // 边界情况
        if(sequenceList.length === 1){
            currentIndex = 0 //其他下标根本没值
        }

        // 设置当前播放歌曲列表
        commit('setSequenceList', sequenceList)
        // 设置源歌曲列表
        commit('setPlayList', playList)
        // 设置播放状态
        commit('setPlayingState', true)
        // 设置全屏
        commit('setFullScreen', true)
        // 设置当前歌曲下标
        commit('setCurrentIndex', currentIndex )
    },

    // --------------- 设置全部歌曲到当前歌曲列表 ---------------
    setAllPlay({ commit, state }, list){

        // 设置当前播放歌曲列表
        commit('setSequenceList', list)
        // 设置源歌曲列表
        commit('setPlayList', list)
        // 设置播放状态
        commit('setPlayingState', true)
        // 设置全屏
        commit('setFullScreen', true)
        // 设置当前歌曲下标
        commit('setCurrentIndex', 0)
        // 设置播放模式为顺序播放
        commit('setPlayMode', 0)
    },

    // --------------- 修改播放模式 ---------------
    changeMode({ commit, getters ,state }, mode){
        const currentSong = getters.currentSong
        // 修改随机播放
        if(mode === 2){
            commit('setSequenceList', shuffle(state.playList))
        }else{
            commit('setSequenceList', state.playList)
        }
        // 当前播放歌曲不变
        const index = findIndex(state.sequenceList, currentSong)
        // 设置当前歌曲下标
        commit('setCurrentIndex', index)
        // 设置播放模式
        commit('setPlayMode', mode)
    },

    // --------------- 删除歌曲 ---------------
    removeSong({ commit, state }, song){
        const playList = [...state.playList] //源播放列表
        const sequenceList = [...state.sequenceList] //当前播放列表
        let currentIndex = state.currentIndex //当前播放的索引值

        // 找到要删除的歌曲对应的index
        const sequenceIndex = findIndex(sequenceList, song)
        const playlistIndex = findIndex(playList, song)
        // 找不到
        if(sequenceIndex < 0 || playList < 0) return
        // 找到，删掉
        sequenceList.splice(sequenceIndex, 1)
        playList.splice(playlistIndex, 1)
        // 被删除项在当前播放歌曲前面
        if(sequenceIndex < currentIndex){
            currentIndex--
        }
        // 被删除的是当前播放歌曲，并且在sequenceList的最后一项
        if(sequenceList.length === currentIndex){
            currentIndex = 0
        }
        // 设置当前播放歌曲列表
        commit('setSequenceList', sequenceList)
        // 设置源歌曲列表
        commit('setPlayList', playList)
        // 源歌曲列表为空
        if(!playList.length){
            // 设置播放状态
            commit('setPlayingState', false)
        }
        // 设置当前歌曲下标
        commit('setCurrentIndex', currentIndex)
    }, 

    // --------------- 全部清空 ---------------
    clearSongList({ commit }){
        // 设置当前播放歌曲列表
        commit('setSequenceList', [])
        // 设置源歌曲列表
        commit('setPlayList', [])
        // 设置播放状态
        commit('setPlayingState', false)
        // 设置全屏
        commit('setFullScreen', false)
        // 设置当前歌曲下标
        commit('setCurrentIndex', 0 )
    }
}

function findIndex(list, song){
    // 为true时是index下标，不满足返回-1
    return list.findIndex(item => item.id === song.id)
}

function shuffle(list){
    const arr = list.splice()
    arr.sort((a, b) =>{
        return Math.random() - 0.5
    })
}

export default actions