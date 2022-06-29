import { get } from "./base";

// 那到26个字母的数组，遍历数组发起请求
export function getSingerList(arrStr) {
    // console.log(arrStr);
    let singerList = []  //接收所有的数据
    let promiseArr = []  

    for (let i = 0; i < arrStr.length; i++) {
        // 把数据全部集中在promiseArr中
        promiseArr.push(new Promise((resolve, reject) => {
            handle(arrStr[i], singerList, resolve)
        }))
    }
    // console.log(promiseArr);
    // 处理数据
    return Promise.all(promiseArr).then(() => {
        // 排好顺序
        singerList.sort((a, b) => {
            return a.tag.charCodeAt() - b.tag.charCodeAt()
        })
        // 把“热”的歌单放在首字母的最前面
        singerList.unshift(singerList.pop())
        return singerList
    })
}
// 获取歌手歌曲数据
export function getSingerDetail(singerItem){
    return get('/artists',{
        id: singerItem.id
    })

}
// 每个首字母获取到需要的数据
function handle(item, singerList, resolve) {
    if(item === '热') {
        get('/top/artists', {
            limit: 30
        }).then((result) => {
            // console.log(result);
            singerList.push({
                tag: item,
                nameArr: result.artists
            })
            resolve()
        }).catch(err => {
            throw err
        })
    } else {
        // 通过首字母查询歌手
        get('/artist/list', {
            initial: item,
            type: -1,
            area: 7
        }).then((result) => {
            // console.log(result);
            singerList.push({
                tag: item,
                nameArr: result.artists
            })
            resolve()
        }).catch(err => {
            throw err
        })
    }
}