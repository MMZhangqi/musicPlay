export function formatTime(interval) {
    //mm : ss
    interval = interval | 0 //取整
    // 分钟
    // padStart ES6字符串补齐 
    // 第一个参数为字符串长度 第二个参数：当字符串没有满足长度时，自动向字符串前面补一个字符串
    const minute = ((interval / 60 | 0) + '').padStart(2, '0')
    // 秒钟
    const second = (interval % 60  + '').padStart(2, '0')

    return `${minute}:${second}`
}