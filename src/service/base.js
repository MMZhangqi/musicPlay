import axios from 'axios'

export function get(url, params) {
    return axios.get(url, {
        params
    }).then(res => {
        return res.data // 返回响应的data数据
    }).catch(err => {
        throw err
    })
}