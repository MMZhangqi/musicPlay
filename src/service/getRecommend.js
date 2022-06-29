import {get} from './base'

// 获取轮播图
export function getSlider(){
    return get('/banner', {
        type: 2
    })
}

// 请求热门推荐歌单接口
export function getRecommendAlbum(){
    return get('/top/playlist', {
        limit: 30
    })
}