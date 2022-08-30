import { get } from '@/service/base'

// 获取音乐
export function getSongUrl(song){
    return get('/song/url', {
        id: song.id
    })
}