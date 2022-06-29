const state ={
    // 当前播放列表
    sequenceList: [],
    // 源播放列表
    playList: [],
    // 播放状态
    playing: false,
    // 播放模式 0顺序播放 1单曲播放 2随机播放
    playMode: 0,
    // 当前播放索引值
    currentIndex: 0,
    // 全屏播放器/迷你播放器
    fullScreen: false,
    favoriteList: [],
    // 历史播放记录
    playHistory: []
}

export default state